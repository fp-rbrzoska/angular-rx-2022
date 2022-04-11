import { Observable, tap } from "rxjs"
export enum LogLevel {
  NONE,
  ERROR,
  INFO
}

export const debug = (message: string, logLevel: LogLevel = LogLevel.INFO) => {
  return (sourceValue: Observable<any>) => sourceValue.pipe(
    tap( val => {
      if ((window as any).logLevel && logLevel <= (window as any).logLevel) {
        console.log(message + ': ', val)
      }
    })
  )
}
