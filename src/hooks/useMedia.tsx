import { useEffect, useState } from "react";

const useMedia = () => {
  const [md, setMd] = useState(false);
  const [tablet, setTablet] = useState(false);
  const [lg, setLg] = useState(false);
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mediaMd = window.matchMedia("(min-width: 768px)");
    const mediaTablet = window.matchMedia("(min-width: 992px)");
    const mediaLg = window.matchMedia("(min-width: 1024px)");
    const mediaDesktop = window.matchMedia("(min-width: 1280px)");
    const listener = () => {
      if (mediaDesktop.matches) setDesktop(mediaDesktop.matches);
      else if (mediaLg.matches) setLg(mediaLg.matches);
      else if (mediaTablet.matches) setTablet(mediaTablet.matches);
      else if (mediaMd.matches) setMd(mediaMd.matches);
    };
    listener();
    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [desktop, lg, tablet, md]);
  return { md, tablet, lg, desktop };
};

export default useMedia;
