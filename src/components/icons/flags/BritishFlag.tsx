export const BritishFlag = () => (
  <svg className="h-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30">
    <clipPath id="a">
      <path d="M0 0v30h60V0z" />
    </clipPath>
    <clipPath id="b">
      <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
    </clipPath>
    <g clipPath="url(#a)">
      <path d="M0 0v30h60V0z" fill="#012169" />
      <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0l60 30m0-30L0 30" clipPath="url(#b)" stroke="#C8102E" strokeWidth="4" />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
  //
  //
  // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 30">
  //   <clipPath id="t">
  //     <path d="M25,15h25v15zv15h-25zh-25v-15zv-15h25z" />
  //   </clipPath>
  //   <path d="M0,0v30h50v-30z" fill="#012169" />
  //   <path d="M0,0 50,30M50,0 0,30" stroke="#fff" stroke-width="6" />
  //   <path d="M0,0 50,30M50,0 0,30" clip-path="url(#t)" stroke="#C8102E" stroke-width="4" />
  //   <path d="M-1 11h22v-12h8v12h22v8h-22v12h-8v-12h-22z" fill="#C8102E" stroke="#FFF" stroke-width="2" />
  // </svg>
)
