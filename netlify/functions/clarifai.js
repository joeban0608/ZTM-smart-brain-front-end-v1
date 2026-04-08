const CLARIFAI_API_URL = (modelVersionId) =>
  `https://api.clarifai.com/v2/users/clarifai/apps/main/models/face-detection/versions/${modelVersionId}/outputs`;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  const modelVersionId = process.env.CLARIFAI_MODEL_VERSION_ID;
  const pat = process.env.CLARIFAI_PAT;

  if (!modelVersionId || !pat) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing CLARIFAI_MODEL_VERSION_ID or CLARIFAI_PAT' })
    };
  }

  try {
    const response = await fetch(CLARIFAI_API_URL(modelVersionId), {
      method: 'POST',
      headers: {
        Authorization: `Key ${pat}`,
        'Content-Type': 'application/json'
      },
      body: event.body
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
