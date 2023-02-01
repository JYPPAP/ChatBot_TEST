import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: "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"
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
    if (!configuration.apiKey) {
        res.status(500).json({
            error: {
                message: "OpenAI API Key 가 없습니다. 생성 후 넣어주세요.",
            }
        });
        return;
    }

    const prompt = req.body.animal || '';
    if (prompt.trim().length === 0) {
        res.status(400).json({
            error: {
                message: "유효한 값을 입력해주세요.",
            }
        });
        return;
    }

    try {
        const completion = await openai.createCompletion({
            model: "code-davinci-002",
            prompt: "You: How do I combine arrays?\nJavaScript chatbot: You can use the concat() method.\nYou: How do you make an alert appear after 10 seconds?\nJavaScript chatbot",
            temperature: 0,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.5,
            presence_penalty: 0.0,
            stop: ["You:"],
        });
        res.status(200).json({ result: completion.data.choices[0].text });
    } catch(error) {
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Open AI 요청에서 에러 발생: ${error.message}`);
            res.status(500).json({
                error: {
                    message: '요청을 처리하는 중 에러 발생',
                }
            });
        }
    }
}