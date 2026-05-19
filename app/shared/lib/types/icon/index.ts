import { SVGProps } from 'react'

export type TIconProps = SVGProps<SVGSVGElement>

export type TMultiColorIconProps = TIconProps & {
    color1?: string
    color2?: string
    color3?: string
    color4?: string
}
