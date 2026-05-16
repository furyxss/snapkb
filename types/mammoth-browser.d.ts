declare module "mammoth/mammoth.browser" {
  type MammothMessage = {
    type: string;
    message: string;
  };

  type ConvertResult = {
    value: string;
    messages: MammothMessage[];
  };

  const mammoth: {
    convertToHtml(input: { arrayBuffer: ArrayBuffer }): Promise<ConvertResult>;
  };

  export default mammoth;
}
