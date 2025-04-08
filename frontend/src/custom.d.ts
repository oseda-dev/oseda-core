// dont think we'll need this, but I always need something akin to this.
// Also svg imports dont work lol

declare module "*.svg" {
  const content: string;
  export default content;
}
