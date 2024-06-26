import type { NextApiRequest, NextApiResponse } from "next";

const APIUri = process.env.API_SERVER;

const __ = async (req: NextApiRequest, res: NextApiResponse) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const result = await fetch(`${APIUri}/bookings/info`, {
    method: "POST",
    body: JSON.stringify({
      booking: {
        id: req.query.id,
        email: req.query.email,
        reference_id: req.query.reference_id,
      },
    }),
    headers,
  });
  if (result.status !== 201) {
    const error = result.statusText;
    return res
      .status(result.status)
      .json({ status: result.status, message: result.statusText, error });
  }
  const data = await result.json();
  return res.status(200).json(data);
};

export default __;
