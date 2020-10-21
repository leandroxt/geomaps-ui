interface Classes {
  [key: string]: boolean
}

export default function classnames(classes: Classes): string {
  return Object.keys(classes)
    .filter((key) => classes[key])
    .reduce((accu, curr) => `${accu}${curr} `, '')
    .trim();
}
