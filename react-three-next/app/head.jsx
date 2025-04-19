const title = 'React Three Next Starter'
const url = 'https://react-three-next.vercel.app/'
const description = 'The easiest and fastest way to create a 3D website using React Three Fiber and NextJS'
const author = 'Author'
const twitter = '@pmndrs'

export default function Head() {
  return (
    <>
      {/* Recommended Meta Tags */}
      <meta charSet='utf-8' />
      <meta name='language' content='english' />
      <meta httpEquiv='content-type' content='text/html' />
      <meta name='author' content={author} />
      <meta name='designer' content={author} />
      <meta name='publisher' content={author} />
    </>
  )
}
