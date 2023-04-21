interface Props {
  href: string
  src: any
}

export function Header2ImageAnchor(props: Props): JSX.Element {
  return (
    <a
      href={props.href}
      target="_blank"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img alt="external link" src={props.src} height={25} />
    </a>
  )
}
