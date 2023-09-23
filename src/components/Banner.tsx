export type BannerData = {
  message: string;
  state: "success" | "error";
};

export default function Banner({ banner }: { banner: BannerData }) {
  const isSuccess = banner.state === "success";
  const icon = isSuccess ? "✅" : "🔥";
  return (
    <p
      className={`p-2 rounded-xl w-full text-center ${
        isSuccess ? "bg-green-300" : "bg-red-300"
      }`}
    >
      {`${icon} ${banner.message}`}
    </p>
  );
}
