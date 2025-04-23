const title = 'Litoral Obsoleto'
const url = 'https://litoral-obsoleto.vercel.app/'
const description = 'Sea-level rise and coastal memory decay.'
const author = 'Julia '

export default function Head() {
  return (
    <>

      <meta charSet='utf-8' />
      <meta name='language' content='english' />
      <meta httpEquiv='content-type' content='text/html' />
      <meta name='author' content={author} />
      <meta name='title' content={title} />
      <meta name='url' content={url} />
      <meta name='description' content={description} />
      <meta name='keywords' content='litoral, obsoleto, sea-level rise, coastal memory decay' />
    </>
  )
}
