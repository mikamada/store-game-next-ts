import Image from 'next/image'
import { useRouter } from 'next/router';

export interface GameItemProps {
  title: string;
  category: string;
  thumbnail: "/assets/img/Thumbnail-1.png" | "/assets/img/Thumbnail-2.png" | "/assets/img/Thumbnail-3.png" | "/assets/img/Thumbnail-4.png" | "/assets/img/Thumbnail-5.png"
}

export default function GameItem(props: GameItemProps) {
  const { title, category, thumbnail } = props;
  const router = useRouter();

  return (
    <div className="featured-game-card position-relative" onClick={() => router.push("/detail")}>
      <div className="blur-sharp">
        <Image className='thumbnail' src={thumbnail} width={205} height={270} alt="thumbnail" />
      </div>
      <div className="cover position-absolute bottom-0 m-32">
        <div className="d-flex flex-column h-100 justify-content-between text-decoration-none">
          <div className="game-icon mx-auto">
            <Image src={"/assets/icon/console.svg"} width={54} height={36} alt='console' />
          </div>
          <div>
            <p className="fw-semibold text-white text-xl m-0">{title}</p>
            <p className="fw-light text-white m-0">{category}</p>
          </div>
        </div>
      </div>

    </div>
  )
}
