import { Poppins, Syne, Jost, Mitr } from 'next/font/google'

const normal_poppins = Poppins({ subsets: ['latin'], weight: '500' })
const semi_poppins = Poppins({ subsets: ['latin'], weight: '600' })
const bold_poppins = Poppins({ subsets: ['latin'], weight: '700' })
const thin_poppins = Poppins({ subsets: ['latin'], weight: '400' })

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
})

const syne = Syne({ subsets: ['latin'], weight: '400' })
const jost = Jost({ subsets: ['latin'], weight: '500' })
const mitr = Mitr({ subsets: ['latin'], weight: '400' })

export {
  poppins,
  normal_poppins,
  semi_poppins,
  bold_poppins,
  thin_poppins,
  syne,
  jost,
  mitr
}
