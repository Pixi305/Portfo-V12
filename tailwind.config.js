/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './newComponent/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        mbl: { max: "740px" },
      },
      animation: {
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: { backgroundPosition: "50% 50%, 50% 50%" },
          to: { backgroundPosition: "350% 50%, 350% 50%" },
        },
      },
      colors:{
        "off-white": "#5A5A5A",
        "gray":"#F8F8F8",
        "main-2": "#1ABCFE",
        "main":"#A3390B",
        lp:{
          blue: "#1874FF",
          deep:"#0E378B",
          black:"#090A0B",
          grey: "#F5F5F5",
          gray:"#E3E3E3",
          gray2:"#595959",
          gray3:"#F8F8F8",
          gray4:"#EDEDED",
          deepblack:"#031323",
        },
        la:{
          blue:"#007BFF",
          black: "#202123",
          black2:"#090A0B",
          lightblue:"#0FAFF0",
          gray:"#EEEEEE",
          bdgray :"#F5F5F5",
          gray2:"#595959",
          gray3: "#6E6E73",
          gray4: "#FAFAFA"


        },
      
      },
      boxShadow:{
        mile: "0px 0px 9px rgba(0, 0, 0, 0.1)"

      },
      backgroundImage:{
        lpBg:"linear-gradient(179.9deg, rgba(0, 0, 0, 0) 18.23%, rgba(0, 0, 0, 0.46) 60.96%, rgba(0, 0, 0, 0.46) 69.96%, rgba(0, 0, 0, 0.46) 83.95%, rgba(0, 0, 0, 0.46) 99.92%)"
      }
    },
    
  },
  plugins: [],
}


