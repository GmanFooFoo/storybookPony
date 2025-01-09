const fs = require('fs')
const path = require('path')
const ts = require('typescript')

module.exports = {
  transforms: {
    COMPONENTS: () => {
      const componentsDir = './src/components'
      let docs = '# Components\n\n'

      function extractComponentDocs(filePath) {
        const source = fs.readFileSync(filePath, 'utf-8')
        const ast = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true)
        
        let componentName = ''
        let props = []
        let description = ''

        ts.forEachChild(ast, node => {
          if (ts.isInterfaceDeclaration(node) && node.name.text.includes('Props')) {
            props = node.members.map(member => ({
              name: member.name.getText(),
              type: member.type.getText(),
              optional: member.questionToken ? true : false,
            }))
          }
          if (ts.isFunctionDeclaration(node) || ts.isVariableStatement(node)) {
            componentName = node.name?.text || node.declarationList?.declarations[0]?.name?.text
          }
        })

        return { componentName, props, description }
      }

      function generateComponentDocs() {
        const components = fs.readdirSync(componentsDir, { recursive: true })
          .filter(file => /\.(tsx|ts)$/.test(file))
          .filter(file => !file.includes('.test.'))
          .map(file => path.join(componentsDir, file))

        components.forEach(file => {
          const { componentName, props } = extractComponentDocs(file)
          if (componentName) {
            docs += `## ${componentName}\n\n`
            if (props.length) {
              docs += '### Props\n\n'
              docs += '| Name | Type | Required | Description |\n'
              docs += '|------|------|----------|-------------|\n'
              props.forEach(prop => {
                docs += `| ${prop.name} | \`${prop.type}\` | ${!prop.optional} | |\n`
              })
              docs += '\n'
            }
          }
        })

        return docs
      }

      return generateComponentDocs()
    },

    API_ROUTES: () => {
      const apiDir = './src/app/api'
      let docs = '# API Routes\n\n'

      function extractRouteInfo(filePath) {
        const source = fs.readFileSync(filePath, 'utf-8')
        const routePath = filePath
          .replace(apiDir, '')
          .replace('/route.ts', '')
          .replace(/\[(\w+)\]/g, ':$1')
        
        const methods = []
        if (source.includes('export async function GET')) methods.push('GET')
        if (source.includes('export async function POST')) methods.push('POST')
        if (source.includes('export async function PUT')) methods.push('PUT')
        if (source.includes('export async function DELETE')) methods.push('DELETE')

        return { routePath, methods }
      }

      function generateApiDocs() {
        const routes = fs.readdirSync(apiDir, { recursive: true })
          .filter(file => file.endsWith('route.ts'))
          .map(file => path.join(apiDir, file))

        docs += '| Route | Methods | Description |\n'
        docs += '|-------|---------|-------------|\n'

        routes.forEach(file => {
          const { routePath, methods } = extractRouteInfo(file)
          docs += `| \`${routePath}\` | ${methods.join(', ')} | |\n`
        })

        return docs
      }

      return generateApiDocs()
    }
  }
} 