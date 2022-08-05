// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const body = JSON.parse(req.body);

  res.setHeader(
    "set-cookie",
    `color-scheme=${body.colorScheme}; path=/; samesite=lax; httponly; max-age=30758400;`
  );

  res.status(200).end();
}
