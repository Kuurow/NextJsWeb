import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import Modal from "../../components/Modal";
import cloudinary from "../../utils/cloudinary";
import getBase64ImageUrl from "../../utils/generateBlurPlaceholder";
import type { ImageProps } from "../../utils/types";
import { useLastViewedPhoto } from "../../utils/useLastViewedPhoto";

const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
  const router = useRouter();
  const { photoId } = router.query;
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  return (
    <>
      <Head>
        <title>Kuurow | Gallery</title>
        <meta property="og:image" content="" />
        <meta name="twitter:image" content="" />
      </Head>
      {photoId && (
        <Modal
          images={images}
          onClose={() => setLastViewedPhoto(Number(photoId))}
        />
      )}
      <div className="gl-wrap">
        <header className="gl-header">
          <div className="gl-header-rule" />
          <span className="gl-header-index">Gallery / 01</span>
          <h1 className="gl-header-title">The Archive</h1>
          <p className="gl-header-wip">Work in progress — more to come</p>
          <div className="gl-header-rule-bot" />
        </header>
        <main className="gl-main">
          <div className="columns-2 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
            {images.map(({ id, public_id, format, blurDataUrl, width, height }) => {
              const imgWidth = Number(width);
              const imgHeight = Number(height);
              return (
                <Link
                  key={id}
                  href={`/gallery?photoId=${id}`}
                  ref={id === lastViewedPhoto ? lastViewedPhotoRef : null}
                  shallow
                  className="gl-card"
                >
                  <Image
                    alt="Kuu's screenshot"
                    placeholder={blurDataUrl ? "blur" : "empty"}
                    blurDataURL={blurDataUrl}
                    src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                    width={imgWidth}
                    height={imgHeight}
                    sizes="(max-width: 640px) 50vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
                  />
                </Link>
              );
            })}
          </div>
        </main>
      </div>
      <Link href="/" className="gl-back">← Home</Link>
      <footer className="ns-footer">
        <div className="ns-footer-inner">
          <div className="ns-footer-rule" />
          <div className="ns-footer-bottom">
            <span className="ns-footer-copy">© 2025 Kuurow — All rights reserved</span>
            <span className="ns-footer-tag">Gallery / Archive</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const results = await cloudinary.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
    .sort_by("public_id", "desc")
    .max_results(50)
    .execute();
  let reducedResults: ImageProps[] = [];

  let i = 0;
  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
    });
    i++;
  }

  const blurImagePromises = results.resources.map((image: ImageProps) => {
    return getBase64ImageUrl(image);
  });
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

  for (let i = 0; i < reducedResults.length; i++) {
    reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i];
  }

  return {
    props: {
      images: reducedResults,
    },
  };
}
