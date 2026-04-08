# smart-brain-v1
這是跟著 ZTM 教學做的人臉辨識前端，現在已改成透過 Netlify Functions 呼叫 Clarifai，避免前端直接暴露金鑰與 CORS 問題。

---  
### reference:    
- ZTM-課程 [Link here](https://www.udemy.com/share/101WcU3@XNVd54LtGB5w73KeTAMPkTWmtoMMCHU6i9ONGnlUBgqarAGzzmY17aLXHT2fjIJASg==/ "title")  
- 我的blog教學 [Link here](https://www.notion.so/ZTM-Final-Project-Smart-Brain-Front-end-001764fffff647309a2df15b8b1a1fb2)
  
---
你可以根據下列步驟來測試此 React 人臉辨識專案，但記得先準備自己的 Clarifai 憑證。
1. clone 此repo
2. Run npm install
3. Create `.env` from `.env.example`
4. Set `CLARIFAI_MODEL_VERSION_ID` and `CLARIFAI_PAT`
5. Run `npm start` for the frontend, or `netlify dev` if you want to test the Netlify Function locally

部署到 Netlify 時，請在 Netlify dashboard 設定同名環境變數：
- `CLARIFAI_MODEL_VERSION_ID`
- `CLARIFAI_PAT`

api 申請詳見我的blog: [點這裡](https://www.notion.so/Clarifai-API-Updates-Models-and-Troubleshooting-a62619f26fc74ab188d7a74b1ea23226 "title")
---
這章完整教學，詳見我的blog: [點這裡](https://www.notion.so/ZTM-Final-Project-Smart-Brain-Front-end-001764fffff647309a2df15b8b1a1fb2 "title")
---
作品連結: [點這裡](https://lively-clafoutis-bf780b.netlify.app)
