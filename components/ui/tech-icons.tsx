import type { SVGProps } from "react";

type TechIconProps = SVGProps<SVGSVGElement> & { size?: number };

export function JavaScriptIcon({ size = 24, ...props }: TechIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} {...props}>
      <rect width="24" height="24" rx="2" fill="#F7DF1E" />
      <path d="M6.5 18.5l1.5-1V14l1 2.5 1-1.5v4l-1 .5-1.5-1V18.5z" fill="#000" />
      <path d="M11 18l1.5-1v-2l1 1.5 1-1V20l-1.5.5L13 19l-1 1.5-1-.5v-2z" fill="#000" />
      <path d="M15.5 18l1.5-1v-3l1 1.5 1-1V20l-1.5.5L17 19l-1 1.5-.5-.5v-2z" fill="#000" />
    </svg>
  );
}

export function TypeScriptIcon({ size = 24, ...props }: TechIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} {...props}>
      <rect width="24" height="24" rx="2" fill="#3178C6" />
      <path d="M3.5 12.5h3v8h2v-8h3v-2h-8v2zM14 10.5v2h4.5v2H16v2h2.5v2H14v2h5q.75 0 1.25-.5t.5-1.25v-7q0-.75-.5-1.25T19 10.5h-5z" fill="#fff" />
    </svg>
  );
}

export function ReactIcon({ size = 24, ...props }: TechIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} {...props}>
      <circle cx="12" cy="12" r="2.5" fill="#61DAFB" />
      <g fill="none" stroke="#61DAFB" strokeWidth="1.5">
        <ellipse cx="12" cy="12" rx="10" ry="3.5" />
        <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(120 12 12)" />
      </g>
    </svg>
  );
}

export function NodeJsIcon({ size = 24, ...props }: TechIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} {...props}>
      <path d="M12 2.5c-.3 0-.6.07-.85.22l-7.8 4.5c-.5.3-.85.85-.85 1.45v9c0 .6.35 1.15.85 1.45l7.8 4.5c.25.15.55.22.85.22s.6-.07.85-.22l7.8-4.5c.5-.3.85-.85.85-1.45v-9c0-.6-.35-1.15-.85-1.45l-7.8-4.5c-.25-.15-.55-.22-.85-.22z" fill="#339933" />
      <path d="M15.5 8.5c-.55 0-1 .45-1 1v3.5c0 .55-.45 1-1 1s-1-.45-1-1v-.5c0-.55-.45-1-1-1s-1 .45-1 1v.5c0 1.65 1.35 3 3 3s3-1.35 3-3v-3.5c0-.55-.45-1-1-1z" fill="#fff" />
    </svg>
  );
}

export function TailwindIcon({ size = 24, ...props }: TechIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} {...props}>
      <path d="M12 4C9.33 4 7.5 5.33 6.5 8c1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.33C12.7 8.7 13.7 9.7 16 9.7c2.67 0 4.5-1.33 5.5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.33C15.3 5.3 14.3 4.3 12 4zM6.5 11.7C3.83 11.7 2 13.03 1 15.7c1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.33C7.2 16.3 8.2 17.3 10.5 17.3c2.67 0 4.5-1.33 5.5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.33-1.1-1.1-2.1-2.1-4.1-2.1z" fill="#06B6D4" />
    </svg>
  );
}

export function NextJsIcon({ size = 24, ...props }: TechIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} {...props}>
      <rect width="24" height="24" rx="4" fill="#000" />
      <path d="M13.2 7.5h1.8v9h-1.8V7.5z" fill="#fff" />
      <path d="M7.5 7.5h1.8l4.5 6.75V7.5h1.8v9h-1.8L9 9.75V16.5H7.5V7.5z" fill="#fff" />
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z" fill="none" />
    </svg>
  );
}

export function FigmaIcon({ size = 24, ...props }: TechIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} {...props}>
      <path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4z" fill="#0ACF83" />
      <path d="M4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4z" fill="#A259FF" />
      <path d="M4 4c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4z" fill="#F24E1E" />
      <path d="M12 0h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0z" fill="#FF7262" />
      <path d="M20 12c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z" fill="#1ABCFE" />
    </svg>
  );
}

export function GitHubLogoIcon({ size = 24, ...props }: TechIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export const techIcons: Record<string, React.ComponentType<TechIconProps>> = {
  JavaScript: JavaScriptIcon,
  TypeScript: TypeScriptIcon,
  React: ReactIcon,
  "Node.js": NodeJsIcon,
  "Tailwind CSS": TailwindIcon,
  "Next.js": NextJsIcon,
  Figma: FigmaIcon,
  GitHub: GitHubLogoIcon,
};
