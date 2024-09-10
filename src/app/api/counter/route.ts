// https://nextjs.org/docs/app/building-your-application/routing/route-handlers


// este archivo lo podemos crear en cualquier lado donde NO HAYA un page.tsx ya que sino se ejecutara este
// si seguimos esta estructura de carpeta nunca va a pasar

// http://localhost:3000/api/counter - de esta forma accedemos al endpoint

// import { NextResponse } from "next/server" - no se usa mas esto


// aca podremos tener acceso a bases de datos y hacer mutaciones, inserciones, eliminaciones, etc
// los API sirven para qu nos podamos comunicar con otras aplicaciones u otras aplicaciones se puedan comunicar con nosotros


export async function GET(request: Request) {



  console.log({ method: request.method })


  // no se usa mas asi segun la documentacion
  // return NextResponse.json({
  //   method: 'GET',
  //   count: 100,
  // })

  return Response.json({
    method: 'GET',
    count: 100,
  })
}
export async function POST(request: Request) {

  console.log({ method: request.method })


  return Response.json({
    method: 'POST',
    count: 100,
  })
}

