
import { NextResponse } from "next/server";
import api from "./axios";

export async function middleware(req) {
  const accessToken = req.cookies.get("accessToken");

  try {
    let tokenValid = false;

    if (!accessToken) {
      // لو مفيش Access Token → نجرب نجدد
      const refreshRes = await api.post("/api/auth/refresh-token", { client: "web" });
      if (refreshRes.status !== 200) throw new Error("Refresh failed");
    }

    // دلوقتي نتحقق من صلاحية التوكن
    const verifyRes = await api.post("/api/auth/verify-token", { client: "web" });
    tokenValid = verifyRes.data.valid;

    if (!tokenValid) throw new Error("Invalid token");

    // لو كل حاجة صح → السماح بالدخول
    return NextResponse.next();
  } catch (err) {
    console.error("Token error:", err);
    return NextResponse.redirect(new URL("/register", req.url));
  }
}

// حماية صفحة البروفايل مؤقتًا
export const config = {
  matcher: ["/profile/:path*"],
};
