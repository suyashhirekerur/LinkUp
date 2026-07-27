export function createWelcomeEmailTemplate(name, clientURL) {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome to LinkUp</title>
</head>

<body style="margin:0;padding:0;background:#eef3fb;font-family:Inter,Segoe UI,Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
<tr>
<td align="center">

<table width="620" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:24px;overflow:hidden;
box-shadow:0 15px 40px rgba(0,0,0,.08);">

<!-- Hero -->
<tr>
<td style="
background:linear-gradient(135deg,#4F46E5,#06B6D4);
padding:60px 40px;
text-align:center;
position:relative;
">

<div style="
width:95px;
height:95px;
background:white;
border-radius:50%;
display:inline-flex;
align-items:center;
justify-content:center;
margin-bottom:20px;
box-shadow:0 8px 25px rgba(255,255,255,.25);
">

<img src="https://img.freepik.com/free-vector/hand-drawn-message-element-vector-cute-sticker_53876-118344.jpg"
width="60">

</div>

<h1 style="
margin:0;
color:white;
font-size:34px;
font-weight:700;
">

Welcome to LinkUp 🚀

</h1>

<p style="
margin-top:18px;
font-size:18px;
color:rgba(255,255,255,.92);
max-width:420px;
margin-left:auto;
margin-right:auto;
line-height:1.6;
">

Fast. Secure. Beautiful conversations
start here.

</p>

</td>
</tr>

<!-- Body -->

<tr>
<td style="padding:45px;">

<p style="
font-size:20px;
font-weight:600;
margin:0;
color:#111827;
">

Hello <span style="color:#4F46E5;">${name}</span> 👋

</p>

<p style="
margin-top:18px;
font-size:16px;
color:#4B5563;
line-height:1.8;
">

Thank you for joining LinkUp!
You're just one click away from connecting with your friends,
family and teammates in real-time.

</p>

<!-- Feature Cards -->

<table width="100%" cellspacing="0" cellpadding="0" style="margin-top:35px;">

<tr>

<td width="48%"
style="
background:#F8FAFC;
border-radius:16px;
padding:22px;
border:1px solid #E5E7EB;
">

<div style="font-size:32px;">🖼️</div>

<h3 style="margin:12px 0 8px;">Personalize</h3>

<p style="margin:0;color:#6B7280;font-size:15px;line-height:1.6;">
Upload your profile photo and make your account yours.
</p>

</td>

<td width="4%"></td>

<td width="48%"
style="
background:#F8FAFC;
border-radius:16px;
padding:22px;
border:1px solid #E5E7EB;
">

<div style="font-size:32px;">👥</div>

<h3 style="margin:12px 0 8px;">Add Friends</h3>

<p style="margin:0;color:#6B7280;font-size:15px;line-height:1.6;">
Search your contacts and start chatting instantly.
</p>

</td>

</tr>

<tr><td height="18"></td></tr>

<tr>

<td
style="
background:#F8FAFC;
border-radius:16px;
padding:22px;
border:1px solid #E5E7EB;
">

<div style="font-size:32px;">💬</div>

<h3 style="margin:12px 0 8px;">Start Chatting</h3>

<p style="margin:0;color:#6B7280;font-size:15px;line-height:1.6;">
Create conversations and send messages in real-time.
</p>

</td>

<td></td>

<td
style="
background:#F8FAFC;
border-radius:16px;
padding:22px;
border:1px solid #E5E7EB;
">

<div style="font-size:32px;">📷</div>

<h3 style="margin:12px 0 8px;">Share Media</h3>

<p style="margin:0;color:#6B7280;font-size:15px;line-height:1.6;">
Share photos, videos, documents and memories.
</p>

</td>

</tr>

</table>

<!-- CTA -->

<div style="text-align:center;margin:45px 0;">

<a href="${clientURL}"

style="
display:inline-block;
padding:16px 42px;
background:linear-gradient(135deg,#4F46E5,#06B6D4);
color:white;
text-decoration:none;
border-radius:50px;
font-size:17px;
font-weight:600;
box-shadow:0 10px 25px rgba(79,70,229,.35);
">

Open LinkUp →

</a>

</div>

<!-- Info Box -->

<div style="
background:#EEF6FF;
border-left:5px solid #4F46E5;
padding:20px;
border-radius:12px;
">

<p style="
margin:0;
font-size:15px;
line-height:1.7;
color:#374151;
">

💡 Need help?
Our support team is available anytime to help you get started.

</p>

</div>

<p style="
margin-top:35px;
font-size:16px;
color:#374151;
line-height:1.8;
">

Happy Messaging ❤️

<br><br>

<b>The LinkUp Team</b>

</p>

</td>
</tr>

<!-- Footer -->

<tr>

<td style="
padding:35px;
text-align:center;
background:#F9FAFB;
border-top:1px solid #E5E7EB;
">

<p style="
margin:0;
font-size:13px;
color:#9CA3AF;
">

© 2026 LinkUp • All Rights Reserved

</p>

<p style="
margin-top:18px;
">

<a href="#" style="text-decoration:none;color:#4F46E5;margin:0 10px;">Privacy</a>

<a href="#" style="text-decoration:none;color:#4F46E5;margin:0 10px;">Terms</a>

<a href="#" style="text-decoration:none;color:#4F46E5;margin:0 10px;">Support</a>

</p>

</td>

</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
  `;
}