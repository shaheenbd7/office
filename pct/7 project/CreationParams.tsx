export default interface CreationParams {
  rootJson: { [key: string]: any };

  print?: (rootJson: { [key: string]: any }) => void;
}
