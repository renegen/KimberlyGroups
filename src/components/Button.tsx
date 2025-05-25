import React from 'react'
import { LinkField } from '@prismicio/client';
import { PrismicNextLink } from '@prismicio/next'
import clsx from 'clsx';

type Props = {
  buttonLink: LinkField | null | string;
    buttonText: string | null;
    className?: string;
}

export default function Button({ buttonLink, buttonText, className }: Props) {
  if (!buttonLink) return null;

  const isLinkField = typeof buttonLink === 'object' && 'link_type' in buttonLink;

  return isLinkField ? (
    <PrismicNextLink
      className={clsx("rounded-xl bg-orange-300 px-5 py-4 text-center text-xl font-bold uppercase tracking-wide text-black transition-colors duration-150 hover:bg-orange-400 md:text-2xl", className)}
      field={buttonLink as LinkField}
    >
      {buttonText}
    </PrismicNextLink>
  ) : (
    <a
      className={clsx("rounded-xl bg-orange-300 px-5 py-4 text-center text-xl font-bold uppercase tracking-wide text-black transition-colors duration-150 hover:bg-orange-400 md:text-2xl", className)}
      href={buttonLink as string}
    >
      {buttonText}
    </a>
  );
}
