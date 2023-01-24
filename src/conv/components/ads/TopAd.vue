<template>
    <div ref="content" class="bg-teal-500/[0.2] rounded-lg overflow-hidden">
        
    </div>
</template>

<script>
export default {
    name: 'TopAd',
    data() { return {} },
    mounted() {
        const content = this.$refs.content;
        content.innerHTML = `
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1090876909795093" crossorigin="anonymous"></sc`+`ript>
            <!-- Converter - Top ads -->
            <ins class="adsbygoogle"
                style="display:block"
                data-ad-client="ca-pub-1090876909795093"
                data-ad-slot="9294580672"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
            <script> (adsbygoogle = window.adsbygoogle || []).push({}); </sc`+`ript>
        `;
    }
}
</script>