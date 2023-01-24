<template>
    <div ref="content" class="bg-teal-500/[0.2] rounded-lg overflow-hidden">
        
    </div>
</template>

<script>
export default {
    name: 'SideAd',
    data() { return {} },
    mounted() {
        const content = this.$refs.content;
        content.innerHTML = `
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1090876909795093" crossorigin="anonymous"></sc`+`ript>
            <!-- Converter - Side ads -->
            <ins class="adsbygoogle"
                style="display:block"
                data-ad-client="ca-pub-1090876909795093"
                data-ad-slot="5306400054"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
            <script> (adsbygoogle = window.adsbygoogle || []).push({}); </sc`+`ript>
        `;
    }
}
</script>