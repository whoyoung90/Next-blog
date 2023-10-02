import * as yup from "yup";

// yup: 데이터 유효성 검사 라이브러리
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
  if (!bodySchema.isValidSync(req.body)) {
    return new Response("유효하지 않은 포맷", { status: 400 });
  }

  // [2] 노드 메일러를 이용하여 메일 전송
  const { from, subject, message } = req.body;
}
