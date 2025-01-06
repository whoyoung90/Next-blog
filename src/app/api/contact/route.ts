import * as yup from "yup";
import { sendEmail } from "@/API/email";

const bodySchema = yup.object().shape({
  from: yup.string().email().required(),
  subject: yup.string().required(),
  message: yup.string().required(),
});

/**
 * @description v13 API Routes (Serverless)
 * "/api/contact" 요청이 오면 실행되는 함수 (http 요청별로 함수를 나눌수 있는 장점)
 * 특정 경로에 GET, POST, PUT, DELETE과 같은 요청이 오면 그때 함수가 실행되도록!
 */
export async function POST(req: Request) {
  const errMsg = "메일 전송에 실패했습니다. 다시 시도해 주세요!";
  const body = await req.json(); // *[error] ReadableStream

  if (!bodySchema.isValidSync(body)) {
    return new Response(JSON.stringify({ message: errMsg }), {
      status: 400,
    });
  }

  // [2] 노드 메일러를 이용하여 메일 전송
  try {
    await sendEmail(body);
    return new Response(JSON.stringify({ message: "메일을 전송하였습니다!" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: errMsg }), {
      status: 500,
    });
  }
}

// *: API Route에서 사용하는 Request는 Node에서 사용하는 Request와 동일하므로 body는 ReadableStream이다.
// 그러므로 JSON으로 변환해야 한다!
