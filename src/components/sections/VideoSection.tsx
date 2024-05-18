import { useClient } from '@/hooks/getContents';
import parse from 'html-react-parser';

type video = {
  id: string;
  publishedAt: string;
  title: string;
  imageHtml: {
    html: string;
  };
};

type ResponseData = {
  data: {
    videos: video[];
  };
};

const VideoField = (video: video) => {
  const { title, imageHtml } = video;
  return (
    <div className="flex flex-col gap-4 items-center">
      <div>{title}</div>
      <div>{parse(imageHtml.html)}</div>
    </div>
  );
};

export const VideoSection = async () => {
  const { getContents } = useClient();

  const { data }: ResponseData = await getContents(`
      query MyQuery {
        videos(first: 10) {
          id
          title
          imageHtml{
            html
          }
        }
      }
  `);

  const { videos } = data;

  return (
    <div className="flex gap-4 flex-col">
      {/* <h1 className="text-lg">Music Video</h1> */}
      <div className="flex justify-center flex-col gap-4 ">
        {videos.map((video) => (
          <VideoField key={video.id} {...video} />
        ))}
      </div>
    </div>
  );
};
