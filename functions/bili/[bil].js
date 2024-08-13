export async function onRequest(context) {
  var myHeaders = new Headers();
  myHeaders.set("Content-Type", "application/json");
  myHeaders.set("cookie","buvid3=E07E8D11-A05A-3E22-6924-BD3F70AF6BC974427infoc; b_nut=1711285574; buvid4=563BD5C0-168E-2CFF-34AB-21F438DDB52374427-024032413-Ack3YcJ3JG00XQcrPwx75KfbjkzBU%2FR1G8EoWoK1Zso2nfRjAmouJsnikwDitFX7; LIVE_BUVID=AUTO8517112855753185; _uuid=E148573A-81082-BDFF-FF69-295FFEB6B74998451infoc; buvid_fp_plain=undefined; CURRENT_FNVAL=4048; rpdid=0zbfVFCHL4|jYVKhIV8|QPF|3w1SdWGY; enable_web_push=DISABLE; header_theme_version=CLOSE; home_feed_column=5; SESSDATA=eefcab33%2C1732975065%2Cf36e2%2A62CjD3hv5QPF7Ud74HKN5x-r5U7et2voc258Qm0YrxepcLhXQVCpswD_ZYeo0BRHcc2rgSVldaWjkxbTJmbG5TTWdZNF9VNHRtWnVORUZsaThuNDFvbUJkOEJ4MFJQM1FrekNOdDRSZzlHUW12a3ljNjF2NEExQVdhNVIyR0NEYkhXRnpNM2NKazBBIIEC; bili_jct=611aa0111be19ca140b81cf1a2aea2ff; DedeUserID=452395918; DedeUserID__ckMd5=55a43623b6c42355; sid=71ex9rr6; hit-dyn-v2=1; browser_resolution=1482-842; fingerprint=6a5e5c0fd05d5b63da4eb9681b300ed3; buvid_fp=6a5e5c0fd05d5b63da4eb9681b300ed3; bp_t_offset_452395918=958003261510516736; Hm_lvt_8a6e55dbd2870f0f5bc9194cddf32a02=1722919116; bili_ticket=eyJhbGciOiJIUzI1NiIsImtpZCI6InMwMyIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjM3MzE1MzgsImlhdCI6MTcyMzQ3MjI3OCwicGx0IjotMX0.Kzd1IPxYJEuvgb2O3PX4U-kfL88BEgvfoczjxkM9OA0; bili_ticket_expires=1723731478; b_lsid=96ED9B79_19146F4E271; PVID=3");
  return await fetch(`https://api.live.bilibili.com/room/v1/Room/get_info?from=room&room_id=${context.params.bil}`, {
  method: "GET",
  headers: myHeaders,});
}
