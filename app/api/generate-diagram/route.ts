import { NextResponse } from "next/server";

const DEFAULT_BASE_URL = "https://api.deepseek.com";
const DEFAULT_MODEL = "deepseek-v4-pro";

type GenerateRequest = {
  toolTitle?: string;
  mermaidType?: string;
  userPrompt?: string;
  template?: string;
};

function cleanMermaidOutput(text: string) {
  const trimmed = text.trim();
  const fencedMatch = trimmed.match(/```(?:mermaid)?\s*([\s\S]*?)```/i);
  return fencedMatch ? fencedMatch[1].trim() : trimmed;
}

function buildSystemPrompt(mermaidType: string, toolTitle: string, template: string) {
  return [
    `你是一个专业的 Mermaid 图表生成助手。`,
    `你的任务是根据用户需求，输出可直接渲染的 Mermaid 图代码。`,
    `当前图类型是：${toolTitle}。`,
    `要求优先使用 Mermaid 的 "${mermaidType}" 语法。`,
    `只返回 Mermaid 代码，不要返回解释、标题、Markdown 列表、代码围栏或额外说明。`,
    `如果用户描述不完整，请基于常见业务场景补全合理节点和关系，但不要偏题。`,
    `输出必须可渲染，命名尽量清晰，使用中文标签。`,
    `下面是该工具当前的参考模板风格，你可以参考其结构，但不要机械照抄：`,
    template,
  ].join("\n");
}

export async function POST(request: Request) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  const baseUrl = process.env.DEEPSEEK_BASE_URL || DEFAULT_BASE_URL;
  const model = process.env.DEEPSEEK_MODEL || DEFAULT_MODEL;

  if (!apiKey) {
    return NextResponse.json(
      { error: "缺少 DEEPSEEK_API_KEY，请先在 .env.local 中配置。" },
      { status: 500 },
    );
  }

  let body: GenerateRequest;
  try {
    body = (await request.json()) as GenerateRequest;
  } catch {
    return NextResponse.json({ error: "请求体不是合法 JSON。" }, { status: 400 });
  }

  const userPrompt = body.userPrompt?.trim();
  const mermaidType = body.mermaidType?.trim();
  const toolTitle = body.toolTitle?.trim();
  const template = body.template?.trim();

  if (!userPrompt || !mermaidType || !toolTitle || !template) {
    return NextResponse.json(
      { error: "缺少必要参数：toolTitle、mermaidType、template、userPrompt。" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: buildSystemPrompt(mermaidType, toolTitle, template),
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
        stream: false,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      return NextResponse.json(
        { error: `DeepSeek 调用失败：${response.status} ${detail}` },
        { status: 502 },
      );
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;

    if (!content || typeof content !== "string") {
      return NextResponse.json({ error: "DeepSeek 没有返回有效内容。" }, { status: 502 });
    }

    return NextResponse.json({
      mermaid: cleanMermaidOutput(content),
      model,
      baseUrl,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "调用 DeepSeek 时发生未知错误。",
      },
      { status: 500 },
    );
  }
}
