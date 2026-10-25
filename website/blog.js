(function () {
  document.querySelectorAll("[data-blog-event]").forEach(function (link) {
    link.addEventListener("click", function () {
      if (typeof window.gtag !== "function") return;
      window.gtag("event", link.dataset.blogEvent, {
        article_slug: link.dataset.articleSlug || "blog-index",
        cta_variant: link.dataset.ctaVariant || "none",
        link_location: link.dataset.linkLocation || "unknown"
      });
    });
  });
})();
