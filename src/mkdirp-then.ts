import mkdirp from 'mkdirp'

export const mkdirpThen = (dir: string, mode?: any) => {
  return new Promise((resolve: () => void, reject: (err: any) => void) => {
    mkdirp(dir, mode)
      .then(
        () => {
          resolve()
        }
      )
  })
}