import { FC } from "react";

type Props={
    token:string
}

export const VerficationTokenEmail:FC<Props>=({token})=>{
    return(
        <div className="w-full">
            <h1>灘校文化祭 抽選券システム</h1>
            <img src={`${process.env.HOST}/img/logo.svg`} alt="logo" />
            <p>以下のリンクをクリックして、メールアドレスを確認してください。</p>
            <a href={`${process.env.HOST}/verify/${token}`} target="_blank">リンク</a>
        </div>
    )
}