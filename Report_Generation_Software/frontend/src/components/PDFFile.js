import {Page, Text, Image, Document, Stylesheet} from '@react-pdf/renderer';
const forese = require('../assets/forese.png')

const styles = Stylesheet.create({
    body:{
        paddingTop:35,
        paddingBottom:65,
        paddingHorizontal:35
    },
    title:{
        fontSize:24,
        textAlign:'center'
    },
    text:{
        margin:12,
        fontSize:14,
        textAlign:'justify',
        fontFamily:'Times-Roman'
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey",
        fontFamily: "AntonFamily",
    },
    pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey",
        fontFamily: "AntonFamily",
    },
});


function PDFFile() {
   <Document>
        <Page style={styles.body}>
            <Text style={styles.header} fixed></Text>
            <Image style={styles.image} src={forese}/>
            <Text style={styles.text}>Forese</Text>
        </Page>
   </Document>
}
export default PDFFile