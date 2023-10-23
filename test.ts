import { sign, verify } from "jsonwebtoken";
(async () => {
  const a = sign({ uuid: "test", expiresIn: "1" }, "dfjaof",{expiresIn:"1s"});
  console.log(a)
  verify(a, "dfjaof", (e, d) => {
    console.log(e, d);
  });
  await new Promise((r) => setTimeout(r, 2000));
  verify(a, "dfjaof", (e, d) => {
    console.log(e, d);
  });
})();
