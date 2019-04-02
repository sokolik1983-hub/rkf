import React from 'react'
import {Link} from 'react-router-dom'
const SRC = 'https://s3-alpha-sig.figma.com/img/dadc/c089/d53e46dbcbcf63ec1934e1eeab1a9f6b?Expires=1555286400&Signature=PfmSU8NoNWXoDNCY9QgnjuITNctIMCcJxer9SLVCZQCUB40tALyue65xLm5IwDMwO2pyQPbXFLz~kIcx~3~vZCnVQXZoCmDy8Xzq282R5lkLbwa9v2W4VqMlUbrX2OTwFaZN1f6UQpNFmElLG03beISdKygl~8NvK1RCYcIwyQexUvpREjEe7kCiruvaxOxiL3G~1oDIbQffGodqQGfJvdiM~GDhzv9XMzVKevqe0khcQH-6QfQIY4tOCSaFyzw253EGn04l3MTSxOK3iFM6aVRMO8vKjacl-L1hfdfJvOctq1lIEvOQyp7dIcWN2sbC4ok0KYxh8f57dipr3zWfhQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'

const HeaderLogo = () => <Link to="/" className="header__logo"><img src={SRC} alt="logo"/></Link>;

export default HeaderLogo;