interface Props {
  href: string
  src: any
}

export function ImageAnchor(props: Props): JSX.Element {
  return (
    <a
      href={props.href}
      target="_blank"
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 4,
        marginRight: 4,
      }}
    >
      <img alt="external link" src={props.src} height={25} />
    </a>
  )
}
