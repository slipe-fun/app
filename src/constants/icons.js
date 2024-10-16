const icons = {
	blogs: "M6.66992 4.63803C6.33301 5.27976 6.33301 6.11984 6.33301 7.8V16.2C6.33301 17.8802 6.33301 18.7202 6.66992 19.362C6.96627 19.9265 7.43914 20.3854 8.02077 20.673C8.68199 21 9.54758 21 11.2787 21H12.7213C14.4524 21 15.318 21 15.9792 20.673C16.5609 20.3854 17.0337 19.9265 17.3301 19.362C17.667 18.7202 17.667 17.8802 17.667 16.2V7.8C17.667 6.11984 17.667 5.27976 17.3301 4.63803C17.0337 4.07354 16.5609 3.6146 15.9792 3.32698C15.318 3 14.4524 3 12.7213 3H11.2787C9.54758 3 8.68199 3 8.02077 3.32698C7.43914 3.6146 6.96627 4.07354 6.66992 4.63803ZM3.01471 8.48433C2.86116 7.15966 3.92915 6 5.30264 6V18C4.62783 18 4.0607 17.508 3.98526 16.8572L3.01471 8.48433ZM20.9853 8.48433C21.1388 7.15966 20.0709 6 18.6974 6V18C19.3722 18 19.9393 17.508 20.0147 16.8572L20.9853 8.48433Z",
	plus: "M3 12C3 12.6213 3.50368 13.125 4.125 13.125H10.875L10.875 19.875C10.875 20.4963 11.3787 21 12 21C12.6213 21 13.125 20.4963 13.125 19.875V13.125H19.875C20.4963 13.125 21 12.6213 21 12C21 11.3787 20.4963 10.875 19.875 10.875L13.125 10.875V4.125C13.125 3.50368 12.6213 3 12 3C11.3787 3 10.875 3.50368 10.875 4.125L10.875 10.875H4.125C3.50368 10.875 3 11.3787 3 12Z",
	search: "M10.3113 15.6268C12.9852 17.4022 16.6262 17.1113 18.9833 14.7542C21.6722 12.0652 21.6722 7.70563 18.9833 5.0167C16.2944 2.32777 11.9348 2.32777 9.24583 5.0167C6.88871 7.37382 6.59784 11.0148 8.37324 13.6887C8.33839 13.7173 8.30462 13.7479 8.27208 13.7804L3.40334 18.6492C2.86555 19.187 2.86555 20.0589 3.40334 20.5967C3.94113 21.1344 4.81305 21.1344 5.35083 20.5967L10.2196 15.7279C10.2521 15.6954 10.2827 15.6616 10.3113 15.6268ZM17.5227 13.2936C15.6404 15.1758 12.5887 15.1758 10.7064 13.2936C8.8242 11.4113 8.8242 8.35957 10.7064 6.47732C12.5887 4.59507 15.6404 4.59507 17.5227 6.47732C19.4049 8.35957 19.4049 11.4113 17.5227 13.2936Z",
	bell: "M6 9.99457C6 5.39729 8.57536 3 12 3C15.4246 3 18 5.15272 18 9.75V13.6875C18 14.0209 18.2614 14.2265 18.5228 14.4321C18.5747 14.473 18.6266 14.5138 18.6764 14.5556L19.5219 15.2649C20.4637 16.0552 19.9208 17.625 18.7056 17.625H5.29441C4.07921 17.625 3.53626 16.0552 4.47814 15.2649L5.32356 14.5556C5.6245 14.3031 6 13.9247 6 13.5251V9.99457ZM15.044 19.787C14.4726 20.5078 13.3241 21 12.0005 21C10.6768 21 9.52832 20.5078 8.95693 19.787C8.56861 19.2972 9.08356 18.75 9.71474 18.75H14.2862C14.9174 18.75 15.4323 19.2972 15.044 19.787Z",
	smile: "M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM7.5 8C6.67157 8 6 8.67157 6 9.5C6 10.3284 6.67157 11 7.5 11C8.32843 11 9 10.3284 9 9.5C9 8.67157 8.32843 8 7.5 8ZM15 9.5C15 8.67157 15.6716 8 16.5 8C17.3284 8 18 8.67157 18 9.5C18 10.3284 17.3284 11 16.5 11C15.6716 11 15 10.3284 15 9.5ZM15.9751 13.9896C16.1152 13.4545 15.6434 13 15.077 13H12H8.92303C8.35657 13 7.88477 13.4545 8.02491 13.9896C8.0731 14.1736 8.13478 14.3545 8.20966 14.5307C8.41584 15.016 8.71804 15.457 9.099 15.8284C9.47997 16.1999 9.93224 16.4945 10.43 16.6955C10.9277 16.8965 11.4612 17 12 17C12.5388 17 13.0723 16.8965 13.57 16.6955C14.0678 16.4945 14.52 16.1999 14.901 15.8284C15.282 15.457 15.5842 15.016 15.7903 14.5307C15.8652 14.3545 15.9269 14.1736 15.9751 13.9896Z",
	message: "M6.11762 20.5C7.06377 20.5 9.32055 19.4906 10.732 18.4734C10.8794 18.3621 11.0034 18.3223 11.1275 18.3223C11.2283 18.3303 11.3214 18.3382 11.4067 18.3382C16.9983 18.3303 21 15.2069 21 10.9151C21 6.80622 16.9905 3.5 11.9961 3.5C7.00172 3.5 3 6.80622 3 10.9151C3 13.4743 4.50452 15.7632 7.04826 17.1699C7.18785 17.2574 7.22663 17.3766 7.15683 17.5196C6.70702 18.2906 5.95476 19.1489 5.64455 19.5542C5.29556 20.0072 5.4972 20.5 6.11762 20.5Z",
	menu: "M10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5C14 6.10457 13.1046 7 12 7C10.8954 7 10 6.10457 10 5ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM12 17C10.8954 17 10 17.8954 10 19C10 20.1046 10.8954 21 12 21C13.1046 21 14 20.1046 14 19C14 17.8954 13.1046 17 12 17Z",
	pixeled_1: "M10.2 3H13.8V6.6V10.2V13.8V17.4H17.4V21H13.8H10.2H6.59998V17.4H10.2V13.8V10.2H6.59998V6.6H10.2V3Z",
	pixeled_2: "M11.8667 3H15.4667V6.6H11.8667H8.26669H4.66669V3H8.26669H11.8667ZM15.4667 10.2V6.6H19.0667V10.2H15.4667ZM8.26669 13.8V10.2H11.8667H15.4667V13.8H11.8667H8.26669ZM15.4667 17.4H11.8667H8.26669V13.8H4.66669V17.4V21H8.26669H11.8667H15.4667H19.0667V17.4H15.4667Z",
	pixeled_3: "M11.7333 3H15.3333V6.6H11.7333H8.13332H4.53333V3H8.13332H11.7333ZM15.3333 10.2H18.9333V6.6H15.3333V10.2ZM15.3333 13.8V10.2H11.7333H8.13332H4.53333V13.8H8.13332H11.7333H15.3333ZM15.3333 17.4V13.8H18.9333V17.4H15.3333ZM15.3333 17.4V21H11.7333H8.13332H4.53333V17.4H8.13332H11.7333H15.3333Z",
	pixeled_4: "M8.6 3H5V6.6V10.2V13.8H8.6H12.2V17.4V21H15.8V17.4V13.8H19.4V10.2H15.8V6.6V3H12.2V6.6V10.2H8.6V6.6V3Z",
	pixeled_5: "M4.8667 3H8.4667H12.0667H15.6667H19.2667V6.6H15.6667H12.0667H8.4667V10.2H12.0667H15.6667V13.8H12.0667H8.4667H4.8667V10.2V6.6V3ZM15.6667 17.4V13.8H19.2667V17.4H15.6667ZM15.6667 17.4V21H12.0667H8.4667H4.8667V17.4H8.4667H12.0667H15.6667Z",
	pixeled_6: "M8.3334 3H11.9334H15.5334V6.6H11.9334H8.3334V3ZM15.5334 13.8H11.9334H8.3334V17.4H4.7334V13.8V10.2V6.6H8.3334V10.2H11.9334H15.5334V13.8ZM15.5334 13.8H19.1334V17.4H15.6V21H12H8.40005V17.4H12H15.5334V13.8Z",
	slipe: "M17.9045 11.917C17.9045 11.3304 17.819 10.8351 17.648 10.4311C17.4827 10.0271 17.2518 9.71717 16.9553 9.50133C16.6589 9.29103 16.3226 9.18588 15.9463 9.18588C15.6328 9.17481 15.3591 9.23846 15.1254 9.37681C14.8917 9.5207 14.6893 9.71717 14.5183 9.96621C14.353 10.2153 14.2076 10.503 14.0822 10.8295C13.9625 11.1561 13.8599 11.5047 13.7743 11.8755L13.3981 13.403C13.2271 14.1446 12.9991 14.8253 12.714 15.4451C12.429 16.0649 12.0784 16.6018 11.6622 17.0556C11.2461 17.5094 10.7558 17.8608 10.1914 18.1098C9.62708 18.3644 8.98005 18.4945 8.25036 18.5C7.17862 18.4945 6.24941 18.2288 5.46271 17.7031C4.68171 17.1829 4.07458 16.4302 3.64133 15.4451C3.21378 14.4655 3 13.284 3 11.9004V8.65152V7.0521C3 6.19494 3.69486 5.50008 4.55202 5.50008C5.40917 5.50008 6.10404 6.19494 6.10404 7.0521V8.65152V11.8589C6.10404 12.4677 6.19525 12.9962 6.37767 13.4445C6.56009 13.8983 6.81378 14.2497 7.13872 14.4987C7.46366 14.7478 7.83705 14.8723 8.25891 14.8723C8.65226 14.8723 8.9829 14.7589 9.25083 14.532C9.51876 14.3106 9.74679 13.9841 9.93492 13.5524C10.123 13.1263 10.2941 12.6033 10.448 11.9834L10.9268 10.1322C11.286 8.69887 11.8475 7.56712 12.6114 6.73698C13.3753 5.90685 14.4043 5.49455 15.6983 5.50008C16.7587 5.49455 17.685 5.76849 18.4774 6.32192C19.2698 6.88087 19.8884 7.64737 20.333 8.62139C20.7777 9.59542 21 10.7023 21 11.9419V15.3485V16.9523C21 17.8071 20.3071 18.5 19.4523 18.5C18.5975 18.5 17.9045 17.8071 17.9045 16.9523V15.3485V11.917Z",
	paint: "M3.46177 15.1408C3.99935 15.6946 4.99891 15.8331 5.78847 15.0485C6.07406 14.7623 6.62844 14.1162 7.4852 13.1654C11.6682 8.52228 14.2301 5.5961 14.6753 6.04841C15.0365 6.39918 13.6085 8.61459 12.1806 10.7931C9.56831 14.7716 7.36761 17.6885 9.03074 19.5162C10.3243 20.947 12.2814 19.6639 15.4481 16.6085C17.1448 14.9746 18.3039 13.7746 18.5895 14.0792C18.7743 14.2823 18.3207 15.0854 17.758 16.147C16.9516 17.6885 15.868 19.4239 16.9264 20.587C17.6656 21.3993 19.0683 21.0393 20.6978 19.2762C21.0338 18.907 21.1094 18.4639 20.8238 18.15C20.555 17.8639 20.1771 17.91 19.8915 18.1962C18.8583 19.2854 18.0771 19.7747 17.9512 19.627C17.8 19.4608 18.2535 18.5839 19.0179 17.0885C20.0847 14.9931 20.7398 13.5808 19.7487 12.5192C18.4215 11.0977 16.8676 12.5931 14.1881 15.1869C11.9454 17.3562 10.9879 17.9562 10.7947 17.7162C10.5007 17.3839 11.3658 16.0823 13.8185 12.3162C16.498 8.1992 18.1023 5.50379 16.582 3.87917C14.6081 1.75607 11.937 3.30685 5.41049 10.4146C4.44453 11.4577 3.83976 12.0946 3.52897 12.5008C2.7478 13.4885 2.9242 14.5685 3.46177 15.1408Z",
	terminal: "M3 11.8C3 8.71971 3 7.17957 3.59946 6.00305C4.12677 4.96816 4.96816 4.12677 6.00305 3.59946C7.17957 3 8.71971 3 11.8 3H12.2C15.2803 3 16.8204 3 17.9969 3.59946C19.0318 4.12677 19.8732 4.96816 20.4005 6.00305C21 7.17957 21 8.71971 21 11.8V12.2C21 15.2803 21 16.8204 20.4005 17.9969C19.8732 19.0318 19.0318 19.8732 17.9969 20.4005C16.8204 21 15.2803 21 12.2 21H11.8C8.71971 21 7.17957 21 6.00305 20.4005C4.96816 19.8732 4.12677 19.0318 3.59946 17.9969C3 16.8204 3 15.2803 3 12.2V11.8ZM18 14.5C18 14.8727 17.6978 15.175 17.325 15.175H12.675C12.3022 15.175 12 14.8727 12 14.5C12 14.1272 12.3022 13.825 12.675 13.825H17.325C17.6978 13.825 18 14.1272 18 14.5ZM6.30822 9.83335L9.3553 12L6.30822 14.1666C5.96608 14.4099 5.89773 14.8942 6.15892 15.2243C6.39859 15.5273 6.83031 15.5895 7.14426 15.3663L10.4729 12.9994C11.1757 12.4997 11.1757 11.5003 10.4729 11.0006L7.14426 8.63375C6.83031 8.41052 6.39859 8.4727 6.15892 8.77566C5.89773 9.10583 5.96608 9.59007 6.30822 9.83335Z",
	email: "M9.99995 13.4143L10.2322 13.6465C11.2085 14.6228 12.7914 14.6228 13.7677 13.6465L14 13.4142L19.1646 18.5788C19.1396 18.5924 19.1144 18.6056 19.089 18.6185C18.3403 19 17.3602 19 15.4 19H8.6C6.63982 19 5.65972 19 4.91103 18.6185C4.88564 18.6056 4.86044 18.5924 4.83542 18.5788L9.99995 13.4143ZM8.58574 12.0001L3.42119 17.1646C3.40766 17.1396 3.39442 17.1144 3.38148 17.089C3 16.3403 3 15.3602 3 13.4V10.6C3 8.63982 3 7.65972 3.38148 6.91103C3.3944 6.88566 3.40763 6.86048 3.42114 6.83548L8.58574 12.0001ZM4.83532 5.42123L11.6464 12.2323C11.8417 12.4276 12.1582 12.4276 12.3535 12.2323L19.1646 5.42119C19.1396 5.40766 19.1144 5.39442 19.089 5.38148C18.3403 5 17.3602 5 15.4 5H8.6C6.63982 5 5.65972 5 4.91103 5.38148C4.88561 5.39443 4.86037 5.40768 4.83532 5.42123ZM20.5788 6.83542L15.4142 12L20.5788 17.1646C20.5923 17.1396 20.6056 17.1144 20.6185 17.089C21 16.3403 21 15.3602 21 13.4V10.6C21 8.63982 21 7.65972 20.6185 6.91103C20.6056 6.88564 20.5924 6.86044 20.5788 6.83542Z",
	key: "M19.372 4.6333C17.1091 2.37713 13.417 2.47329 11.0539 4.82933C9.30284 6.57527 8.73306 9.09665 9.63199 11.291L3.32411 17.5803C3.13533 17.7685 3.02187 17.9929 3.01505 18.2717L3.00015 20.4376C2.99333 20.7164 3.22116 21.0085 3.57702 20.9998L7.58043 20.9024C7.949 20.8934 8.2162 20.6147 8.22488 20.2599L8.268 17.9792L11.4961 17.9007C11.8331 17.8862 12.1127 17.6198 12.1217 17.2523L12.2048 14.1159C14.8852 15.1398 17.405 14.6795 19.1692 12.9206C21.5257 10.5711 21.6224 6.8771 19.372 4.6333ZM15.4141 8.57951C14.8127 7.97993 14.8372 6.97886 15.4687 6.34928C16.1066 5.71321 17.0979 5.68909 17.7055 6.29486C18.3069 6.89444 18.2824 7.89551 17.6509 8.52509C17.0195 9.15467 16.0155 9.17909 15.4141 8.57951Z",
	symbol: "M12.341 21C10.8492 21 9.52328 20.8008 8.36306 20.4025C7.20758 20.0089 6.23204 19.4276 5.43646 18.6588C4.64088 17.8946 4.0371 16.9614 3.6251 15.8591C3.2131 14.7569 3.00474 13.4971 3 12.0799C3.00474 10.6951 3.21547 9.44693 3.6322 8.33539C4.04893 7.21922 4.65746 6.26515 5.45777 5.47318C6.25809 4.67657 7.23599 4.06523 8.39148 3.63914C9.54696 3.21305 10.8611 3 12.3339 3C13.7214 3 14.9503 3.2061 16.0205 3.61829C17.0955 4.03049 18.0024 4.60479 18.7411 5.34118C19.4846 6.07294 20.0458 6.92976 20.4246 7.91162C20.8082 8.88885 21 9.94944 21 11.0934C21 11.8854 20.9384 12.6357 20.8153 13.3443C20.6922 14.0482 20.4815 14.6735 20.1831 15.22C19.8895 15.7665 19.4893 16.2019 18.9826 16.5261C18.4759 16.8456 17.8414 17.0193 17.0789 17.0471C16.6006 17.0702 16.1815 17.0262 15.8216 16.9151C15.4617 16.8039 15.1705 16.6303 14.9479 16.3941C14.7399 16.1641 14.6053 15.8855 14.5441 15.5584C14.5391 15.5316 14.5159 15.5118 14.4886 15.5118C14.4657 15.5118 14.4453 15.5258 14.4363 15.5469C14.3242 15.8112 14.1229 16.0542 13.8327 16.276C13.5343 16.5029 13.165 16.6812 12.7245 16.8109C12.2841 16.9359 11.794 16.9869 11.2541 16.9637C10.6764 16.9359 10.1413 16.8063 9.64878 16.5747C9.16101 16.3385 8.73481 16.0096 8.37017 15.5882C8.01026 15.1621 7.73086 14.648 7.53197 14.0459C7.33307 13.4438 7.23362 12.7607 7.23362 11.9965C7.23362 11.2509 7.34254 10.5932 7.56038 10.0235C7.77822 9.45388 8.06946 8.96758 8.4341 8.56465C8.80347 8.16171 9.22021 7.84678 9.68429 7.61984C10.1484 7.38827 10.6267 7.24006 11.1192 7.17522C11.6306 7.10575 12.1113 7.1127 12.5612 7.19606C13.0111 7.27943 13.3852 7.40679 13.6835 7.57816C13.9678 7.73889 14.1521 7.91388 14.2364 8.10313C14.2463 8.12552 14.268 8.14087 14.2926 8.14087C14.325 8.14087 14.3509 8.11447 14.3549 8.08232C14.4053 7.67995 14.965 7.36279 15.375 7.36279C15.7901 7.36279 16.3331 7.69927 16.3331 8.11432V13.9765C16.3378 14.3238 16.423 14.604 16.5888 14.8171C16.7593 15.0301 16.9961 15.1366 17.2991 15.1366C17.678 15.1366 17.9834 14.9907 18.2155 14.699C18.4522 14.4025 18.6227 13.9487 18.7269 13.3373C18.8358 12.7213 18.8879 11.934 18.8832 10.9753C18.8879 10.188 18.7814 9.47472 18.5635 8.83559C18.3504 8.19182 18.0474 7.62679 17.6543 7.14049C17.2612 6.65419 16.7901 6.24894 16.2407 5.92474C15.6961 5.59591 15.09 5.34813 14.4223 5.1814C13.7545 5.01467 13.0418 4.9313 12.2841 4.9313C11.1239 4.9313 10.1034 5.10498 9.22257 5.45234C8.34175 5.79506 7.603 6.28368 7.00631 6.91818C6.41436 7.55268 5.96685 8.30529 5.66377 9.17599C5.36543 10.0421 5.21626 11.0008 5.21626 12.0521C5.21626 13.1775 5.37253 14.1756 5.68508 15.0463C6.00237 15.9124 6.46646 16.6418 7.07735 17.2347C7.68824 17.8275 8.44357 18.2767 9.34333 18.5824C10.2478 18.8881 11.2873 19.0409 12.4617 19.0409C13.0016 19.0409 13.5296 18.9992 14.0458 18.9159C14.562 18.8325 15.026 18.7352 15.438 18.6241C15.9646 18.482 16.5382 18.7659 16.7148 19.2818C16.8734 19.7455 16.6657 20.2603 16.1989 20.4093C16.0743 20.4491 15.9414 20.4885 15.8003 20.5276C15.3031 20.6665 14.7537 20.78 14.1523 20.868C13.5556 20.956 12.9519 21 12.341 21ZM11.8437 14.9699C12.4451 14.9699 12.9258 14.8564 13.2857 14.6295C13.6456 14.3979 13.9037 14.0552 14.06 13.6013C14.2163 13.1474 14.292 12.5824 14.2873 11.9062C14.2873 11.2763 14.2068 10.7599 14.0458 10.357C13.8848 9.95407 13.6267 9.65535 13.2715 9.46083C12.9163 9.26631 12.4451 9.16905 11.8579 9.16905C11.3275 9.16905 10.8753 9.28715 10.5012 9.52335C10.1318 9.75955 9.84767 10.0861 9.64878 10.5029C9.45462 10.9151 9.35754 11.3852 9.35754 11.9132C9.35754 12.4411 9.43567 12.939 9.59195 13.4068C9.75296 13.8699 10.0134 14.2474 10.3733 14.5392C10.738 14.8263 11.2281 14.9699 11.8437 14.9699Z",
	paperPlane: "M4.1078 8.00819L18.8658 3.08603C20.132 2.66371 21.3363 3.868 20.914 5.13423L15.9918 19.8922C15.4847 21.4125 13.3141 21.3527 12.8928 19.8069L11.6405 15.2117C11.5126 14.7423 11.6025 14.2402 11.8854 13.8441L14.7991 9.7656C15.065 9.39339 14.6066 8.93499 14.2344 9.2009L10.1559 12.1146C9.75984 12.3975 9.2577 12.4874 8.78829 12.3595L4.19314 11.1072C2.64726 10.6859 2.58748 8.51525 4.1078 8.00819Z",
	boxes: "M3.27248 4.36502C3 4.8998 3 5.59987 3 7C3 8.40013 3 9.1002 3.27248 9.63498C3.51217 10.1054 3.89462 10.4878 4.36502 10.7275C4.8998 11 5.59987 11 7 11C8.40013 11 9.1002 11 9.63498 10.7275C10.1054 10.4878 10.4878 10.1054 10.7275 9.63498C11 9.1002 11 8.40013 11 7C11 5.59987 11 4.8998 10.7275 4.36502C10.4878 3.89462 10.1054 3.51217 9.63498 3.27248C9.1002 3 8.40013 3 7 3C5.59987 3 4.8998 3 4.36502 3.27248C3.89462 3.51217 3.51217 3.89462 3.27248 4.36502ZM13.2725 4.36502C13 4.8998 13 5.59987 13 7C13 8.40013 13 9.1002 13.2725 9.63498C13.5122 10.1054 13.8946 10.4878 14.365 10.7275C14.8998 11 15.5999 11 17 11C18.4001 11 19.1002 11 19.635 10.7275C20.1054 10.4878 20.4878 10.1054 20.7275 9.63498C21 9.1002 21 8.40013 21 7C21 5.59987 21 4.8998 20.7275 4.36502C20.4878 3.89462 20.1054 3.51217 19.635 3.27248C19.1002 3 18.4001 3 17 3C15.5999 3 14.8998 3 14.365 3.27248C13.8946 3.51217 13.5122 3.89462 13.2725 4.36502ZM13 17C13 15.5999 13 14.8998 13.2725 14.365C13.5122 13.8946 13.8946 13.5122 14.365 13.2725C14.8998 13 15.5999 13 17 13C18.4001 13 19.1002 13 19.635 13.2725C20.1054 13.5122 20.4878 13.8946 20.7275 14.365C21 14.8998 21 15.5999 21 17C21 18.4001 21 19.1002 20.7275 19.635C20.4878 20.1054 20.1054 20.4878 19.635 20.7275C19.1002 21 18.4001 21 17 21C15.5999 21 14.8998 21 14.365 20.7275C13.8946 20.4878 13.5122 20.1054 13.2725 19.635C13 19.1002 13 18.4001 13 17ZM3.27248 14.365C3 14.8998 3 15.5999 3 17C3 18.4001 3 19.1002 3.27248 19.635C3.51217 20.1054 3.89462 20.4878 4.36502 20.7275C4.8998 21 5.59987 21 7 21C8.40013 21 9.1002 21 9.63498 20.7275C10.1054 20.4878 10.4878 20.1054 10.7275 19.635C11 19.1002 11 18.4001 11 17C11 15.5999 11 14.8998 10.7275 14.365C10.4878 13.8946 10.1054 13.5122 9.63498 13.2725C9.1002 13 8.40013 13 7 13C5.59987 13 4.8998 13 4.36502 13.2725C3.89462 13.5122 3.51217 13.8946 3.27248 14.365Z",
	checkmark: "M20.5435 4.27827C21.068 4.71631 21.153 5.51529 20.7334 6.06284L10.7104 19.1422C9.7574 20.3858 7.90869 20.256 7.12378 18.8904L3.1735 12.0172C2.82792 11.416 3.01469 10.6361 3.59065 10.2753C4.16662 9.91452 4.91369 10.1095 5.25927 10.7108L9.02957 17.2708L18.8341 4.47655C19.2537 3.929 20.019 3.84023 20.5435 4.27827Z",
	x: "M12.1376 13.7372L18.7939 20.3935C19.2356 20.8352 19.9518 20.8352 20.3935 20.3935C20.8352 19.9518 20.8352 19.2356 20.3935 18.7939L13.7372 12.1376L20.6687 5.20607C21.1104 4.76435 21.1104 4.04819 20.6687 3.60648C20.227 3.16477 19.5108 3.16477 19.0691 3.60648L12.1376 10.538L4.93087 3.33129C4.48916 2.88957 3.773 2.88957 3.33128 3.33128C2.88957 3.773 2.88957 4.48916 3.33128 4.93087L10.538 12.1376L3.60648 19.0691C3.16477 19.5108 3.16477 20.227 3.60648 20.6687C4.04819 21.1104 4.76435 21.1104 5.20607 20.6687L12.1376 13.7372Z",
	eye: "M21 12C21 13.1 16.9706 17.5 12 17.5C7.02944 17.5 3 13.1 3 12C3 10.9 7.02944 6.5 12 6.5C16.9706 6.5 21 10.9 21 12ZM15.9375 12C15.9375 14.1263 14.1746 15.85 12 15.85C9.82538 15.85 8.0625 14.1263 8.0625 12C8.0625 9.8737 9.82538 8.15 12 8.15C14.1746 8.15 15.9375 9.8737 15.9375 12ZM12 14.2C13.2426 14.2 14.25 13.215 14.25 12C14.25 10.785 13.2426 9.8 12 9.8C10.7574 9.8 9.75 10.785 9.75 12C9.75 13.215 10.7574 14.2 12 14.2Z",
	slashedEye: "M5.42034 5.17665C5.64745 4.94112 6.01568 4.94112 6.24279 5.17665L18.5797 17.9704C18.8068 18.206 18.8068 18.5878 18.5797 18.8234C18.3525 19.0589 17.9843 19.0589 17.7572 18.8234L5.42034 6.02956C5.19322 5.79404 5.19322 5.41217 5.42034 5.17665ZM15.9375 12C15.9375 12.3658 15.8911 12.7203 15.8041 13.0577L18.168 15.509C19.9114 14.1583 21 12.6064 21 12C21 10.8333 16.9706 6.16667 12 6.16667C11.1406 6.16667 10.3093 6.30617 9.52213 6.54298L10.9801 8.05497C11.3054 7.96476 11.6473 7.91667 12 7.91667C14.1746 7.91667 15.9375 9.74484 15.9375 12ZM3 12C3 11.3936 4.08857 9.84168 5.83206 8.49094L8.19587 10.9423C8.10888 11.2797 8.0625 11.6342 8.0625 12C8.0625 14.2552 9.82538 16.0833 12 16.0833C12.3527 16.0833 12.6946 16.0352 13.0199 15.945L14.4779 17.457C13.6907 17.6938 12.8594 17.8333 12 17.8333C7.02944 17.8333 3 13.1667 3 12ZM9.83679 12.644C10.0498 13.4149 10.6356 14.0224 11.379 14.2433L9.83679 12.644ZM12.6211 9.75669L14.1632 11.3559C13.9502 10.5851 13.3644 9.9776 12.6211 9.75669Z",
	user: "M12 12C14.4853 12 16.5 9.98528 16.5 7.5C16.5 5.01472 14.4853 3 12 3C9.51472 3 7.5 5.01472 7.5 7.5C7.5 9.98528 9.51472 12 12 12ZM19.5587 17.308C20.9984 19.1328 18.6839 21 15.9541 21H12H8.04588C5.31613 21 3.00158 19.1328 4.44126 17.308C4.7983 16.8555 5.22259 16.433 5.70904 16.0503C7.3775 14.7375 9.64043 14 12 14C14.3596 14 16.6225 14.7375 18.291 16.0503C18.7774 16.433 19.2017 16.8555 19.5587 17.308Z",
	pencil: "M19.3708 6.73324L20.5453 5.56434C21.1272 4.97989 21.1487 4.34132 20.6207 3.80016L20.2005 3.36723C19.6725 2.83689 19.0152 2.89101 18.4441 3.46464L17.2696 4.62272L19.3708 6.73324ZM6.17087 19.97L18.3363 7.75062L16.2459 5.66175L4.08044 17.8595L3.02444 20.4138C2.90591 20.7385 3.23995 21.0956 3.56322 20.9766L6.17087 19.97Z",
	text: "M4.9627 17.098C4.82737 17.5293 4.44168 17.821 4.00671 17.821C3.3162 17.821 2.831 17.1118 3.05541 16.4304L6.08891 7.22045C6.32941 6.49027 6.98778 6 7.7278 6C8.46755 6 9.12574 6.48992 9.36645 7.21972L12.4043 16.4302C12.629 17.1115 12.1439 17.821 11.4532 17.821C11.0185 17.821 10.633 17.5296 10.4975 17.0986L9.80831 14.9062H5.65045L4.9627 17.098ZM7.77072 8.42423L9.26762 13.1861H6.19016L7.68432 8.42423H7.77072ZM16.6205 18C16.0949 18 15.6215 17.9 15.2003 17.6999C14.7827 17.4959 14.4514 17.1958 14.2066 16.7994C13.9654 16.4031 13.8448 15.9144 13.8448 15.3333C13.8448 14.8331 13.9312 14.4195 14.104 14.0924C14.2768 13.7653 14.5126 13.5036 14.8115 13.3074C15.1103 13.1111 15.4469 12.963 15.8213 12.8629C16.1993 12.759 16.5899 12.684 16.9931 12.6378C17.4791 12.584 17.8733 12.5359 18.1757 12.4935C18.4781 12.4474 18.6977 12.3781 18.8345 12.2857C18.975 12.1895 19.0452 12.0414 19.0452 11.8413V11.8067C19.0452 11.3719 18.9246 11.0352 18.6833 10.7966C18.4421 10.558 18.0947 10.4387 17.6411 10.4387C17.1623 10.4387 16.7825 10.5503 16.5017 10.7735C16.4543 10.8116 16.4096 10.851 16.3675 10.8915C16.0346 11.2115 15.6141 11.5148 15.1662 11.4468C14.6085 11.3621 14.235 10.7678 14.5558 10.2845C14.6381 10.1606 14.7287 10.0446 14.8277 9.93655C15.1589 9.571 15.5639 9.29779 16.0427 9.11693C16.5215 8.93223 17.0507 8.83988 17.6303 8.83988C18.0299 8.83988 18.4277 8.8899 18.8237 8.98995C19.2198 9.09 19.5816 9.25546 19.9092 9.48634C20.2368 9.71337 20.4996 10.0231 20.6976 10.4156C20.8992 10.8081 21 11.2987 21 11.8875V16.8407C21 17.3822 20.5793 17.8211 20.0604 17.8211C19.5414 17.8211 19.1208 17.3822 19.1208 16.8407V16.6032H19.056C18.9372 16.8495 18.7697 17.0803 18.5537 17.2958C18.3413 17.5075 18.0731 17.6787 17.7491 17.8095C17.4287 17.9365 17.0525 18 16.6205 18ZM17.1281 16.4647C17.5205 16.4647 17.8607 16.3819 18.1487 16.2165C18.4367 16.0471 18.6581 15.824 18.8129 15.5469C18.9714 15.2699 19.0506 14.9678 19.0506 14.6407V13.596C18.9894 13.6499 18.885 13.6999 18.7373 13.7461C18.5933 13.7922 18.4313 13.8326 18.2513 13.8673C18.0713 13.9019 17.8931 13.9327 17.7167 13.9596C17.5403 13.9866 17.3873 14.0096 17.2577 14.0289C16.9661 14.0712 16.7051 14.1405 16.4747 14.2367C16.2443 14.3329 16.0625 14.4676 15.9293 14.6407C15.7961 14.81 15.7295 15.0294 15.7295 15.2987C15.7295 15.6835 15.8609 15.974 16.1237 16.1703C16.3865 16.3665 16.7213 16.4647 17.1281 16.4647Z",
	image: "M3 12C3 9.20435 3 7.80653 3.45672 6.7039C4.06569 5.23373 5.23373 4.06569 6.7039 3.45672C7.80653 3 9.20435 3 12 3C14.7956 3 16.1935 3 17.2961 3.45672C18.7663 4.06569 19.9343 5.23373 20.5433 6.7039C21 7.80653 21 9.20435 21 12C21 14.7956 21 16.1935 20.5433 17.2961C19.9343 18.7663 18.7663 19.9343 17.2961 20.5433C16.1935 21 14.7956 21 12 21C9.20435 21 7.80653 21 6.7039 20.5433C5.23373 19.9343 4.06569 18.7663 3.45672 17.2961C3 16.1935 3 14.7956 3 12ZM17.5223 13.1975L17.9878 16.4655C18.1038 17.2803 17.3799 18 16.4443 18H7.5558C6.6092 18 5.88206 17.2642 6.01593 16.4418L6.35932 14.3321C6.5406 13.2184 8.09273 12.7643 8.9991 13.5598L9.94285 14.3881C10.5117 14.8874 11.4205 14.9235 12.0386 14.4715L14.983 12.318C15.9279 11.627 17.3697 12.1263 17.5223 13.1975ZM15 6C13.8954 6 13 6.89543 13 8C13 9.10457 13.8954 10 15 10C16.1046 10 17 9.10457 17 8C17 6.89543 16.1046 6 15 6Z",
	chevronLeft: "M17.816 3.5417C17.4805 2.98282 16.8006 2.8318 16.2973 3.20439L6.87777 10.1785C5.70741 11.045 5.70741 12.955 6.87777 13.8215L16.2973 20.7956C16.8006 21.1682 17.4805 21.0172 17.816 20.4583C18.1514 19.8994 18.0155 19.1443 17.5122 18.7717L8.36603 12L17.5122 5.22827C18.0155 4.85568 18.1514 4.10058 17.816 3.5417Z",
	user1: "M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12ZM12 14C9.69193 14 7.60681 15.0327 6.1179 16.6942C5.9607 16.8696 5.9607 17.1304 6.1179 17.3058C7.60681 18.9673 9.69193 20 12 20C14.3081 20 16.3932 18.9673 17.8821 17.3058C18.0393 17.1304 18.0393 16.8696 17.8821 16.6942C16.3932 15.0327 14.3081 14 12 14ZM12 12.5C13.933 12.5 15.5 10.933 15.5 9C15.5 7.067 13.933 5.5 12 5.5C10.067 5.5 8.5 7.067 8.5 9C8.5 10.933 10.067 12.5 12 12.5Z",
	
};

export default icons;
