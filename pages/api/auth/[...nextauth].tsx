import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "email-password-credential",
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;
        const user = {
          id: 1,
          userId: "tirrilee@gmail.com",
          userName: "tirrilee",
          userImg: "/img/user-img.png",
        };
        if (email === "tirrilee@gmail.com" && password === "1234") {
          return user;
        }
        throw new Error("아이디 혹은 비밀번호가 틀렸습니다.");
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({session, user, token}) {
      session.user.userName = 'tirrilee'
      session.user.userId = 'tirrilee@gmail.com'
      session.user.userImg = '/img/user-img.png'

      return session
    }
  }
});
