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
        <title>Kuu's website | Gallery</title>
        <meta
          property="og:image"
          content=""
        />
        <meta
          name="twitter:image"
          content=""
        />
      </Head>
      {photoId && (
        <Modal
          images={images}
          onClose={() => setLastViewedPhoto(Number(photoId))}
        />
      )}
      <h1 className="text-center z-10 backdrop-blur-xl w-screen bg-transparent p-5 drop-shadow-sm bottom-1/3 font-bold text-black font-neuropol">The gallery is in WIP</h1>
      <main className="mx-auto max-w-[1960px] p-4">
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
                className="group block mb-4"
              >
                <Image
                  alt="Kuu's screenshot"
                  className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                  style={{ transform: "translate3d(0, 0, 0)" }}
                  placeholder={blurDataUrl ? "blur" : "empty"}
                  blurDataURL={blurDataUrl}
                  src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                  width={imgWidth}
                  height={imgHeight}
                  sizes="(max-width: 640px) 50vw,
                      (max-width: 1280px) 50vw,
                      (max-width: 1536px) 33vw,
                      25vw"
                />
              </Link>
            );
          })}
        </div>
      </main>
      <footer className="p-6 text-center text-black/80 sm:p-12 font-neuropol ">
        Go back to the main {" "}
        <a
          href="/"
          target=""
          className="font-semibold hover:text-amber-700 underline-offset-4 underline"
          rel="noreferrer"
        >
          page
        </a>
      </footer>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const results = await cloudinary.v2.search
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
