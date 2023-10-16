'use client'

import Script from 'next/script'

const twitterTag = `
!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
twq('config','ogkf3');
`

const googleTag = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-11328012362');
`

export default function AnalyticsTags() {
  return (
    <>
      <Script id="twitter-tag">{twitterTag}</Script>
      <Script src="https://www.googletagmanager.com/gtag/js?id=AW-11328012362" />
      <Script id="google-analytics">{googleTag}</Script>

      <Script id="hs-script-loader" src="//js-na1.hs-scripts.com/40210064.js"></Script>
    </>
  )
}
