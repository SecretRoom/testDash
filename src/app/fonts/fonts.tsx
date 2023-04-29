import { Global } from '@emotion/react'

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Montserrat';
        src: local('Montserrat'), local('Montserrat'), url('../fonts/Montserrat/Montserrat-VariableFont_wght.ttf') format('truetype');
        font-weight: 400;
        font-style: normal;
      }
      `}
  />
)

export default Fonts