import clsx from 'clsx'
import { TProps } from './types'
import styles from './Toast.module.scss'

export function Toast(props: TProps) {
  const classNames = clsx(styles.root, {
    [styles[`root_${props.type}`]]: props.type,
  })

  return (
    <div className={classNames}>
      <span className={styles.root__message}>{props.message}</span>
    </div>
  )
}
