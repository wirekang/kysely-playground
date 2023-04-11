import github from "src/assets/github.svg"

export function GithubLink(): JSX.Element {
  return (
    <a
      href="https://github.com/wirekang/kysely-playground"
      target="_blank"
      style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <img alt="github logo image for repository link" src={github} height={25} />
    </a>
  )
}
