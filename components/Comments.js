const Comments = () => {
  return (
    <section
      ref={element => {
        if (!element) {
          return;
        }
        const scriptElement = document.createElement('script');
        scriptElement.setAttribute('src', 'https://utteranc.es/client.js');
        scriptElement.setAttribute('repo', 'runtime-rundown/podcast-site');
        scriptElement.setAttribute('issue-term', 'pathname');
        scriptElement.setAttribute('theme', 'boxy-light');
        scriptElement.setAttribute('crossorigin', 'anonymous');
        scriptElement.setAttribute('async', 'true');
        scriptElement.setAttribute('style', 'display: none');
        element.replaceChildren(scriptElement);
      }}
    />
  );
};

export default Comments;
