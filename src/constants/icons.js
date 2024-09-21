const icons = {
    "blogs": "M7 7C7 5.34315 8.34315 4 10 4H14C15.6569 4 17 5.34315 17 7V17C17 18.6569 15.6569 20 14 20H10C8.34315 20 7 18.6569 7 17V7ZM19.9899 8.9897C20.1075 7.92438 19.1831 7.00001 18 7V17C18.6274 17 19.1528 16.5697 19.2152 16.0048L19.9899 8.9897ZM5.99968 7C4.81654 7.00057 3.8924 7.92538 4.01012 8.99099L4.78494 16.0047C4.84736 16.5697 5.37264 17 6 17L5.99968 7Z",
    "plus": "M4 12C4 12.5523 4.44772 13 5 13H11L11 19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11L13 11V5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44771 11 5L11 11H5C4.44772 11 4 11.4477 4 12Z",
    "search": "M10.4989 15.2238C12.8758 16.8019 16.1122 16.5434 18.2074 14.4482C20.5975 12.058 20.5975 8.18278 18.2074 5.79262C15.8172 3.40246 11.942 3.40246 9.55185 5.79262C7.45663 7.88784 7.19808 11.1242 8.77621 13.5011C8.74524 13.5265 8.71522 13.5537 8.68629 13.5826L4.35852 17.9104C3.88049 18.3884 3.88049 19.1634 4.35852 19.6415C4.83656 20.1195 5.6116 20.1195 6.08963 19.6415L10.4174 15.3137C10.4463 15.2848 10.4735 15.2548 10.4989 15.2238ZM16.9091 13.1498C15.2359 14.8229 12.5233 14.8229 10.8502 13.1498C9.17706 11.4767 9.17706 8.76406 10.8502 7.09095C12.5233 5.41784 15.2359 5.41784 16.9091 7.09095C18.5822 8.76406 18.5822 11.4767 16.9091 13.1498Z",
    "bell": "M6.75 10.2174C6.75 6.13092 9.00344 4 12 4C14.9966 4 17.25 5.91353 17.25 10V13.5C17.25 13.7964 17.4787 13.9791 17.7074 14.1619C17.7528 14.1982 17.7983 14.2345 17.8419 14.2717L18.5816 14.9022C19.4058 15.6046 18.9307 17 17.8674 17H6.13261C5.06931 17 4.59423 15.6046 5.41838 14.9022L6.15812 14.2717C6.42144 14.0472 6.75 13.7109 6.75 13.3557V10.2174ZM14.6635 18.9218C14.1635 19.5624 13.1586 20 12.0004 20C10.8422 20 9.83728 19.5624 9.33731 18.9218C8.99754 18.4864 9.44811 18 10.0004 18H14.0004C14.5527 18 15.0033 18.4864 14.6635 18.9218Z",
    "smile": "M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM10 9.5C10 10.3284 9.32843 11 8.5 11C7.67157 11 7 10.3284 7 9.5C7 8.67157 7.67157 8 8.5 8C9.32843 8 10 8.67157 10 9.5ZM17 9.5C17 10.3284 16.3284 11 15.5 11C14.6716 11 14 10.3284 14 9.5C14 8.67157 14.6716 8 15.5 8C16.3284 8 17 8.67157 17 9.5ZM15.8094 13.1031C16.0066 13.2583 16.0623 13.5446 15.9218 13.7562C13.9344 16.7479 10.0656 16.7479 8.07822 13.7562C7.93765 13.5446 7.99338 13.2583 8.1906 13.1031C8.42327 12.92 8.75593 12.9913 8.9318 13.2334C10.5359 15.4414 13.4641 15.4414 15.0682 13.2334C15.2441 12.9913 15.5767 12.92 15.8094 13.1031Z",
    "message": "M6.77122 20C7.61224 20 9.61827 19.1094 10.8729 18.2118C11.0039 18.1136 11.1142 18.0785 11.2245 18.0785C11.3141 18.0856 11.3968 18.0926 11.4726 18.0926C16.4429 18.0856 20 15.3296 20 11.5428C20 7.91725 16.436 5 11.9966 5C7.55709 5 4 7.91725 4 11.5428C4 13.8008 5.33735 15.8205 7.59845 17.0617C7.72253 17.1389 7.757 17.244 7.69496 17.3703C7.29513 18.0505 6.62645 18.8079 6.35071 19.1655C6.0405 19.5652 6.21973 20 6.77122 20Z",
    "menu": "M13.9995 6.00049C13.9995 7.10506 13.1041 8.00049 11.9995 8.00049C10.8949 8.00049 9.99951 7.10506 9.99951 6.00049C9.99951 4.89592 10.8949 4.00049 11.9995 4.00049C13.1041 4.00049 13.9995 4.89592 13.9995 6.00049ZM13.9995 12.0005C13.9995 13.1051 13.1041 14.0005 11.9995 14.0005C10.8949 14.0005 9.99951 13.1051 9.99951 12.0005C9.99951 10.8959 10.8949 10.0005 11.9995 10.0005C13.1041 10.0005 13.9995 10.8959 13.9995 12.0005ZM11.9995 20.0005C13.1041 20.0005 13.9995 19.1051 13.9995 18.0005C13.9995 16.8959 13.1041 16.0005 11.9995 16.0005C10.8949 16.0005 9.99951 16.8959 9.99951 18.0005C9.99951 19.1051 10.8949 20.0005 11.9995 20.0005Z",
}

export default icons