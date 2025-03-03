import { createOpenAI } from '@ai-sdk/openai'
import { Model, ProviderType } from './types'
import { Object, String } from '@sinclair/typebox'
import { createAnthropic } from '@ai-sdk/anthropic'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { createAzure } from '@ai-sdk/azure'
import { createMistral } from '@ai-sdk/mistral'
import { createXai } from '@ai-sdk/xai'
import { createTogetherAI } from '@ai-sdk/togetherai'
import { createCohere } from '@ai-sdk/cohere'
import { createGroq } from '@ai-sdk/groq'
import { createOllama } from 'ollama-ai-provider'
import { createDeepSeek } from '@ai-sdk/deepseek'
import { i18n } from 'src/boot/i18n'

const { t } = i18n.global

const commonSettings = {
  baseURL: String({ title: t('values.apiAddress'), description: t('values.defaultServiceAddress') }),
  apiKey: String({ title: 'API Key', format: 'password' })
}
const ProviderTypes: ProviderType[] = [
  {
    name: 'openai',
    label: 'OpenAI',
    avatar: { type: 'svg', name: 'openai' },
    settings: Object({
      ...commonSettings,
      baseURL: String({ title: t('values.apiAddress'), description: t('values.defaultOpenAIAddress'), default: 'https://api.openai.com/v1' }),
      organization: String({ title: t('values.organization'), description: t('values.optional') }),
      project: String({ title: t('values.project'), description: t('values.optional') })
    }),
    initialSettings: { compatibility: 'strict' },
    constructor: createOpenAI
  },
  {
    name: 'azure',
    label: 'Azure',
    avatar: { type: 'svg', name: 'microsoft-c' },
    settings: Object({
      ...commonSettings,
      resourceName: String({ title: t('values.resourceName') }),
      apiVersion: String({ title: t('values.apiVersion') })
    }),
    initialSettings: {},
    constructor: createAzure
  },
  {
    name: 'anthropic',
    label: 'Anthropic',
    avatar: { type: 'svg', name: 'anthropic' },
    settings: Object({
      ...commonSettings,
      baseURL: String({ title: t('values.apiAddress'), description: t('values.defaultAnthropicAddress'), default: 'https://api.anthropic.com/v1' })
    }),
    initialSettings: {},
    constructor: createAnthropic
  },
  {
    name: 'google',
    label: 'Google',
    avatar: { type: 'svg', name: 'google-c' },
    settings: Object({
      ...commonSettings,
      baseURL: String({ title: t('values.apiAddress'), description: t('values.defaultGoogleAddress'), default: 'https://generativelanguage.googleapis.com/v1beta' })
    }),
    initialSettings: {},
    constructor: createGoogleGenerativeAI
  },
  {
    name: 'deepseek',
    label: 'DeepSeek',
    avatar: { type: 'svg', name: 'deepseek-c' },
    settings: Object(commonSettings),
    initialSettings: {},
    constructor: createDeepSeek
  },
  {
    name: 'mistral',
    label: 'Mistral',
    avatar: { type: 'svg', name: 'mistral-c' },
    settings: Object(commonSettings),
    initialSettings: {},
    constructor: createMistral
  },
  {
    name: 'xai',
    label: 'xAI',
    avatar: { type: 'svg', name: 'grok' },
    settings: Object(commonSettings),
    initialSettings: {},
    constructor: createXai
  },
  {
    name: 'togetherai',
    label: 'Together.ai',
    avatar: { type: 'svg', name: 'togetherai-c' },
    settings: Object(commonSettings),
    initialSettings: {},
    constructor: createTogetherAI
  },
  {
    name: 'cohere',
    label: 'Cohere',
    avatar: { type: 'svg', name: 'cohere-c' },
    settings: Object(commonSettings),
    initialSettings: {},
    constructor: createCohere
  },
  {
    name: 'groq',
    label: 'Groq',
    avatar: { type: 'svg', name: 'groq' },
    settings: Object(commonSettings),
    initialSettings: {},
    constructor: createGroq
  },
  {
    name: 'ollama',
    label: 'Ollama',
    avatar: { type: 'svg', name: 'ollama' },
    settings: Object({
      baseURL: String({ title: t('values.apiAddress'), default: 'http://localhost:11434/api' })
    }),
    initialSettings: {},
    constructor: createOllama
  }
]

const InputTypes = {
  textOnly: { user: [], assistant: [], tool: [] },
  commonVision: { user: ['image/*'], assistant: [], tool: [] },
  claudeVision: { user: ['image/*'], assistant: [], tool: ['image/*'] },
  claudePdf: { user: ['image/*', 'application/pdf'], assistant: [], tool: ['image/*'] },
  audioPreview: { user: ['audio/*'], assistant: [], tool: [] },
  default: { user: ['image/*'], assistant: [], tool: [] },
  gemini2: { user: ['image/*', 'audio/*'], assistant: [], tool: [] }
}
const models: Model[] = [
  { name: 'o1-mini', inputTypes: InputTypes.textOnly },
  { name: 'o1-mini-2024-09-12', inputTypes: InputTypes.textOnly },
  { name: 'o1-preview', inputTypes: InputTypes.textOnly },
  { name: 'o1-preview-2024-09-12', inputTypes: InputTypes.textOnly },
  { name: 'o3-mini', inputTypes: InputTypes.textOnly },
  { name: 'o3-mini-2025-01-31', inputTypes: InputTypes.textOnly },
  { name: 'gpt-4o', inputTypes: InputTypes.commonVision },
  { name: 'gpt-4o-2024-08-06', inputTypes: InputTypes.commonVision },
  { name: 'gpt-4o-2024-05-13', inputTypes: InputTypes.commonVision },
  { name: 'chatgpt-4o-latest', inputTypes: InputTypes.commonVision },
  { name: 'gpt-4o-audio-preview', inputTypes: InputTypes.audioPreview },
  { name: 'gpt-4o-audio-preview-2024-10-01', inputTypes: InputTypes.audioPreview },
  { name: 'gpt-4-turbo', inputTypes: InputTypes.commonVision },
  { name: 'gpt-4-turbo-2024-04-09', inputTypes: InputTypes.commonVision },
  { name: 'gpt-4o-mini', inputTypes: InputTypes.commonVision },
  { name: 'gpt-4o-mini-2024-07-18', inputTypes: InputTypes.commonVision },
  { name: 'gpt-3.5-turbo', inputTypes: InputTypes.textOnly },
  { name: 'claude-3-7-sonnet-20250219', inputTypes: InputTypes.claudePdf },
  { name: 'claude-3-5-sonnet-20241022', inputTypes: InputTypes.claudePdf },
  { name: 'claude-3-5-sonnet-20240620', inputTypes: InputTypes.claudeVision },
  { name: 'claude-3-5-haiku-20241022', inputTypes: InputTypes.textOnly },
  { name: 'claude-3-opus-20240229', inputTypes: InputTypes.claudeVision },
  { name: 'claude-3-sonnet-20240229', inputTypes: InputTypes.claudeVision },
  { name: 'claude-3-haiku-20240307', inputTypes: InputTypes.claudeVision },
  { name: 'gemini-1.5-pro', inputTypes: InputTypes.commonVision },
  { name: 'gemini-1.5-flash', inputTypes: InputTypes.commonVision },
  { name: 'gemini-2.0-flash', inputTypes: InputTypes.gemini2 },
  { name: 'gemini-2.0-flash-exp', inputTypes: InputTypes.gemini2 },
  { name: 'gemini-2.0-flash-thinking-exp', inputTypes: InputTypes.commonVision },
  { name: 'deepseek-chat', inputTypes: InputTypes.textOnly },
  { name: 'deepseek-reasoner', inputTypes: InputTypes.textOnly }
]
const modelOptions = models.map(m => m.name)
const dialogOptions = {
  color: 'primary'
}

const mdPreviewThemes = ['default', 'vuepress', 'github', 'mk-cute', 'smart-blue', 'cyanosis', 'arknights']
const mdCodeThemes = ['atom', 'ally', 'github', 'gradient', 'kimbie', 'paraiso', 'qtcreator', 'stackoverflow']

const codeExtensions = [
  'abap',
  'asc',
  'ash',
  'ampl',
  'mod',
  'g4',
  'apib',
  'apl',
  'dyalog',
  'asp',
  'asax',
  'ascx',
  'ashx',
  'asmx',
  'aspx',
  'axd',
  'dats',
  'hats',
  'sats',
  'as',
  'adb',
  'ada',
  'ads',
  'agda',
  'als',
  'apacheconf',
  'vhost',
  'cls',
  'applescript',
  'scpt',
  'arc',
  'ino',
  'asciidoc',
  'adoc',
  'asc',
  'aj',
  'asm',
  'a51',
  'inc',
  'nasm',
  'aug',
  'ahk',
  'ahkl',
  'au3',
  'awk',
  'auk',
  'gawk',
  'mawk',
  'nawk',
  'bat',
  'cmd',
  'befunge',
  'bison',
  'bb',
  'bb',
  'decls',
  'bmx',
  'bsv',
  'boo',
  'b',
  'bf',
  'brs',
  'bro',
  'c',
  'cats',
  'h',
  'idc',
  'w',
  'cs',
  'cake',
  'cshtml',
  'csx',
  'cpp',
  'c++',
  'cc',
  'cp',
  'cxx',
  'h',
  'h++',
  'hh',
  'hpp',
  'hxx',
  'inc',
  'inl',
  'ipp',
  'tcc',
  'tpp',
  'c-objdump',
  'chs',
  'clp',
  'cmake',
  'cmake.in',
  'cob',
  'cbl',
  'ccp',
  'cobol',
  'cpy',
  'css',
  'capnp',
  'mss',
  'ceylon',
  'chpl',
  'ch',
  'ck',
  'cirru',
  'clw',
  'icl',
  'dcl',
  'click',
  'clj',
  'boot',
  'cl2',
  'cljc',
  'cljs',
  'cljs.hl',
  'cljscm',
  'cljx',
  'hic',
  'coffee',
  '_coffee',
  'cake',
  'cjsx',
  'cjs',
  'cson',
  'iced',
  'cfm',
  'cfml',
  'cfc',
  'lisp',
  'asd',
  'cl',
  'l',
  'lsp',
  'ny',
  'podsl',
  'sexp',
  'cp',
  'cps',
  'cl',
  'coq',
  'v',
  'cppobjdump',
  'c++-objdump',
  'c++objdump',
  'cpp-objdump',
  'cxx-objdump',
  'creole',
  'cr',
  'feature',
  'cu',
  'cuh',
  'cy',
  'pyx',
  'pxd',
  'pxi',
  'd',
  'di',
  'd-objdump',
  'com',
  'dm',
  'zone',
  'arpa',
  'd',
  'darcspatch',
  'dpatch',
  'dart',
  'diff',
  'patch',
  'dockerfile',
  'djs',
  'dylan',
  'dyl',
  'intr',
  'lid',
  'E',
  'ecl',
  'eclxml',
  'ecl',
  'sch',
  'brd',
  'epj',
  'e',
  'ex',
  'exs',
  'elm',
  'el',
  'emacs',
  'emacs.desktop',
  'em',
  'emberscript',
  'erl',
  'es',
  'escript',
  'hrl',
  'xrl',
  'yrl',
  'fs',
  'fsi',
  'fsx',
  'fx',
  'flux',
  'f90',
  'f',
  'f03',
  'f08',
  'f77',
  'f95',
  'for',
  'fpp',
  'factor',
  'fy',
  'fancypack',
  'fan',
  'fs',
  'for',
  'eam.fs',
  'fth',
  '4th',
  'f',
  'for',
  'forth',
  'fr',
  'frt',
  'fs',
  'ftl',
  'fr',
  'g',
  'gco',
  'gcode',
  'gms',
  'g',
  'gap',
  'gd',
  'gi',
  'tst',
  's',
  'ms',
  'gd',
  'glsl',
  'fp',
  'frag',
  'frg',
  'fs',
  'fsh',
  'fshader',
  'geo',
  'geom',
  'glslv',
  'gshader',
  'shader',
  'vert',
  'vrx',
  'vsh',
  'vshader',
  'gml',
  'kid',
  'ebuild',
  'eclass',
  'po',
  'pot',
  'glf',
  'gp',
  'gnu',
  'gnuplot',
  'plot',
  'plt',
  'go',
  'golo',
  'gs',
  'gst',
  'gsx',
  'vark',
  'grace',
  'gradle',
  'gf',
  'gml',
  'graphql',
  'dot',
  'gv',
  'man',
  '1',
  '1in',
  '1m',
  '1x',
  '2',
  '3',
  '3in',
  '3m',
  '3qt',
  '3x',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'l',
  'me',
  'ms',
  'n',
  'rno',
  'roff',
  'groovy',
  'grt',
  'gtpl',
  'gvy',
  'gsp',
  'hcl',
  'tf',
  'hlsl',
  'fx',
  'fxh',
  'hlsli',
  'html',
  'htm',
  'html.hl',
  'inc',
  'st',
  'xht',
  'xhtml',
  'mustache',
  'jinja',
  'eex',
  'erb',
  'erb.deface',
  'phtml',
  'http',
  'hh',
  'php',
  'haml',
  'haml.deface',
  'handlebars',
  'hbs',
  'hb',
  'hs',
  'hsc',
  'hx',
  'hxsl',
  'hy',
  'bf',
  'pro',
  'dlm',
  'ipf',
  'ini',
  'cfg',
  'prefs',
  'pro',
  'properties',
  'irclog',
  'weechatlog',
  'idr',
  'lidr',
  'ni',
  'i7x',
  'iss',
  'io',
  'ik',
  'thy',
  'ijs',
  'flex',
  'jflex',
  'json',
  'geojson',
  'lock',
  'topojson',
  'json5',
  'jsonld',
  'jq',
  'jsx',
  'jade',
  'j',
  'java',
  'jsp',
  'js',
  '_js',
  'bones',
  'es',
  'es6',
  'frag',
  'gs',
  'jake',
  'jsb',
  'jscad',
  'jsfl',
  'jsm',
  'jss',
  'njs',
  'pac',
  'sjs',
  'ssjs',
  'sublime-build',
  'sublime-commands',
  'sublime-completions',
  'sublime-keymap',
  'sublime-macro',
  'sublime-menu',
  'sublime-mousemap',
  'sublime-project',
  'sublime-settings',
  'sublime-theme',
  'sublime-workspace',
  'sublime_metrics',
  'sublime_session',
  'xsjs',
  'xsjslib',
  'jl',
  'ipynb',
  'krl',
  'sch',
  'brd',
  'kicad_pcb',
  'kit',
  'kt',
  'ktm',
  'kts',
  'lfe',
  'll',
  'lol',
  'lsl',
  'lslp',
  'lvproj',
  'lasso',
  'las',
  'lasso8',
  'lasso9',
  'ldml',
  'latte',
  'lean',
  'hlean',
  'less',
  'l',
  'lex',
  'ly',
  'ily',
  'b',
  'm',
  'ld',
  'lds',
  'mod',
  'liquid',
  'lagda',
  'litcoffee',
  'lhs',
  'ls',
  '_ls',
  'xm',
  'x',
  'xi',
  'lgt',
  'logtalk',
  'lookml',
  'ls',
  'lua',
  'fcgi',
  'nse',
  'pd_lua',
  'rbxs',
  'wlua',
  'mumps',
  'm',
  'm4',
  'm4',
  'ms',
  'mcr',
  'mtml',
  'muf',
  'm',
  'mak',
  'd',
  'mk',
  'mkfile',
  'mako',
  'mao',
  'ron',
  'mask',
  'mathematica',
  'cdf',
  'm',
  'ma',
  'mt',
  'nb',
  'nbp',
  'wl',
  'wlt',
  'matlab',
  'm',
  'maxpat',
  'maxhelp',
  'maxproj',
  'mxt',
  'pat',
  'mediawiki',
  'wiki',
  'm',
  'moo',
  'metal',
  'minid',
  'druby',
  'duby',
  'mir',
  'mirah',
  'mo',
  'mod',
  'mms',
  'mmk',
  'monkey',
  'moo',
  'moon',
  'myt',
  'ncl',
  'nl',
  'nsi',
  'nsh',
  'n',
  'axs',
  'axi',
  'axs.erb',
  'axi.erb',
  'nlogo',
  'nl',
  'lisp',
  'lsp',
  'nginxconf',
  'vhost',
  'nim',
  'nimrod',
  'ninja',
  'nit',
  'nix',
  'nu',
  'numpy',
  'numpyw',
  'numsc',
  'ml',
  'eliom',
  'eliomi',
  'ml4',
  'mli',
  'mll',
  'mly',
  'objdump',
  'm',
  'h',
  'mm',
  'j',
  'sj',
  'omgrofl',
  'opa',
  'opal',
  'cl',
  'opencl',
  'p',
  'cls',
  'scad',
  'org',
  'ox',
  'oxh',
  'oxo',
  'oxygene',
  'oz',
  'pwn',
  'inc',
  'php',
  'aw',
  'ctp',
  'fcgi',
  'inc',
  'php3',
  'php4',
  'php5',
  'phps',
  'phpt',
  'pls',
  'pck',
  'pkb',
  'pks',
  'plb',
  'plsql',
  'sql',
  'sql',
  'pov',
  'inc',
  'pan',
  'psc',
  'parrot',
  'pasm',
  'pir',
  'pas',
  'dfm',
  'dpr',
  'inc',
  'lpr',
  'pp',
  'pl',
  'al',
  'cgi',
  'fcgi',
  'perl',
  'ph',
  'plx',
  'pm',
  'pod',
  'psgi',
  't',
  '6pl',
  '6pm',
  'nqp',
  'p6',
  'p6l',
  'p6m',
  'pl',
  'pl6',
  'pm',
  'pm6',
  't',
  'pkl',
  'l',
  'pig',
  'pike',
  'pmod',
  'pod',
  'pogo',
  'pony',
  'ps',
  'eps',
  'ps1',
  'psd1',
  'psm1',
  'pde',
  'pl',
  'pro',
  'prolog',
  'yap',
  'spin',
  'proto',
  'asc',
  'pub',
  'pp',
  'pd',
  'pb',
  'pbi',
  'purs',
  'py',
  'bzl',
  'cgi',
  'fcgi',
  'gyp',
  'lmi',
  'pyde',
  'pyp',
  'pyt',
  'pyw',
  'rpy',
  'tac',
  'wsgi',
  'xpy',
  'pytb',
  'qml',
  'qbs',
  'pro',
  'pri',
  'r',
  'rd',
  'rsx',
  'raml',
  'rdoc',
  'rbbas',
  'rbfrm',
  'rbmnu',
  'rbres',
  'rbtbar',
  'rbuistate',
  'rhtml',
  'rmd',
  'rkt',
  'rktd',
  'rktl',
  'scrbl',
  'rl',
  'raw',
  'reb',
  'r',
  'r2',
  'r3',
  'rebol',
  'red',
  'reds',
  'cw',
  'rpy',
  'rs',
  'rsh',
  'robot',
  'rg',
  'rb',
  'builder',
  'fcgi',
  'gemspec',
  'god',
  'irbrc',
  'jbuilder',
  'mspec',
  'pluginspec',
  'podspec',
  'rabl',
  'rake',
  'rbuild',
  'rbw',
  'rbx',
  'ru',
  'ruby',
  'thor',
  'watchr',
  'rs',
  'rs.in',
  'sas',
  'scss',
  'smt2',
  'smt',
  'sparql',
  'rq',
  'sqf',
  'hqf',
  'sql',
  'cql',
  'ddl',
  'inc',
  'prc',
  'tab',
  'udf',
  'viw',
  'sql',
  'db2',
  'ston',
  'svg',
  'sage',
  'sagews',
  'sls',
  'sass',
  'scala',
  'sbt',
  'sc',
  'scaml',
  'scm',
  'sld',
  'sls',
  'sps',
  'ss',
  'sci',
  'sce',
  'tst',
  'self',
  'sh',
  'bash',
  'bats',
  'cgi',
  'command',
  'fcgi',
  'ksh',
  'sh.in',
  'tmux',
  'tool',
  'zsh',
  'sh-session',
  'shen',
  'sl',
  'slim',
  'smali',
  'st',
  'cs',
  'tpl',
  'sp',
  'inc',
  'sma',
  'nut',
  'stan',
  'ML',
  'fun',
  'sig',
  'sml',
  'do',
  'ado',
  'doh',
  'ihlp',
  'mata',
  'matah',
  'sthlp',
  'styl',
  'sc',
  'scd',
  'swift',
  'sv',
  'svh',
  'vh',
  'toml',
  'txl',
  'tcl',
  'adp',
  'tm',
  'tcsh',
  'csh',
  'tex',
  'aux',
  'bbx',
  'bib',
  'cbx',
  'cls',
  'dtx',
  'ins',
  'lbx',
  'ltx',
  'mkii',
  'mkiv',
  'mkvi',
  'sty',
  'toc',
  'tea',
  't',
  'txt',
  'fr',
  'nb',
  'ncl',
  'no',
  'textile',
  'thrift',
  't',
  'tu',
  'ttl',
  'twig',
  'ts',
  'tsx',
  'upc',
  'anim',
  'asset',
  'mat',
  'meta',
  'prefab',
  'unity',
  'uno',
  'uc',
  'ur',
  'urs',
  'vcl',
  'vhdl',
  'vhd',
  'vhf',
  'vhi',
  'vho',
  'vhs',
  'vht',
  'vhw',
  'vala',
  'vapi',
  'v',
  'veo',
  'vim',
  'vb',
  'bas',
  'cls',
  'frm',
  'frx',
  'vba',
  'vbhtml',
  'vbs',
  'volt',
  'vue',
  'owl',
  'webidl',
  'x10',
  'xc',
  'xml',
  'ant',
  'axml',
  'ccxml',
  'clixml',
  'cproject',
  'csl',
  'csproj',
  'ct',
  'dita',
  'ditamap',
  'ditaval',
  'dll.config',
  'dotsettings',
  'filters',
  'fsproj',
  'fxml',
  'glade',
  'gml',
  'grxml',
  'iml',
  'ivy',
  'jelly',
  'jsproj',
  'kml',
  'launch',
  'mdpolicy',
  'mm',
  'mod',
  'mxml',
  'nproj',
  'nuspec',
  'odd',
  'osm',
  'plist',
  'pluginspec',
  'props',
  'ps1xml',
  'psc1',
  'pt',
  'rdf',
  'rss',
  'scxml',
  'srdf',
  'storyboard',
  'stTheme',
  'sublime-snippet',
  'targets',
  'tmCommand',
  'tml',
  'tmLanguage',
  'tmPreferences',
  'tmSnippet',
  'tmTheme',
  'ts',
  'tsx',
  'ui',
  'urdf',
  'ux',
  'vbproj',
  'vcxproj',
  'vssettings',
  'vxml',
  'wsdl',
  'wsf',
  'wxi',
  'wxl',
  'wxs',
  'x3d',
  'xacro',
  'xaml',
  'xib',
  'xlf',
  'xliff',
  'xmi',
  'xml.dist',
  'xproj',
  'xsd',
  'xul',
  'zcml',
  'xsp-config',
  'xsp.metadata',
  'xpl',
  'xproc',
  'xquery',
  'xq',
  'xql',
  'xqm',
  'xqy',
  'xs',
  'xslt',
  'xsl',
  'xojo_code',
  'xojo_menu',
  'xojo_report',
  'xojo_script',
  'xojo_toolbar',
  'xojo_window',
  'xtend',
  'yml',
  'reek',
  'rviz',
  'sublime-syntax',
  'syntax',
  'yaml',
  'yaml-tmlanguage',
  'yang',
  'y',
  'yacc',
  'yy',
  'zep',
  'zimpl',
  'zmpl',
  'zpl',
  'desktop',
  'desktop.in',
  'ec',
  'eh',
  'edn',
  'fish',
  'mu',
  'nc',
  'ooc',
  'rst',
  'rest',
  'rest.txt',
  'rst.txt',
  'wisp',
  'prg',
  'ch',
  'prw'
]

const materialSymbols = [
  'search',
  'star',
  'bolt',
  'deployed_code',
  'menu_book',
  'key',
  'auto_fix',
  'person',
  'group',
  'share',
  'thumb_up',
  'groups',
  'public',
  'person_add',
  'handshake',
  'support_agent',
  'face',
  'sentiment_satisfied',
  'rocket_launch',
  'group_add',
  'workspace_premium',
  'psychology',
  'diversity_3',
  'emoji_objects',
  'travel_explore',
  'water_drop',
  'eco',
  'pets',
  'mood',
  'sunny',
  'sentiment_dissatisfied',
  'health_and_safety',
  'quiz',
  'sentiment_very_satisfied',
  'military_tech',
  'thumb_down',
  'gavel',
  'recycling',
  'diamond',
  'monitor_heart',
  'emoji_people',
  'diversity_1',
  'workspaces',
  'vaccines',
  'recommend',
  'compost',
  'forest',
  'waving_hand',
  'wc',
  'person_remove',
  'sentiment_neutral',
  'psychology_alt',
  'sentiment_very_dissatisfied',
  'diversity_2',
  'medication',
  'group_work',
  'front_hand',
  'cruelty_free',
  'man',
  'medical_information',
  'add_reaction',
  'rocket',
  'coronavirus',
  'female',
  'potted_plant',
  'rainy',
  'emoji_nature',
  'cookie',
  'person_off',
  'connect_without_contact',
  'woman',
  'mood_bad',
  'groups_2',
  'bedtime',
  'communication',
  'thumbs_up_down',
  'male',
  'solar_power',
  'thunderstorm',
  'account_circle',
  'info',
  'visibility',
  'calendar_month',
  'schedule',
  'help',
  'warning',
  'language',
  'lock',
  'error',
  'visibility_off',
  'verified',
  'manage_accounts',
  'history',
  'task_alt',
  'event',
  'bookmark',
  'calendar_today',
  'lightbulb',
  'question_mark',
  'fingerprint',
  'category',
  'update',
  'priority_high',
  'code',
  'lock_open',
  'build',
  'date_range',
  'supervisor_account',
  'upload_file',
  'ads_click',
  'event_available',
  'power_settings_new',
  'touch_app',
  'today',
  'bug_report',
  'pending',
  'preview',
  'new_releases',
  'stars',
  'celebration',
  'translate',
  'account_box',
  'how_to_reg',
  'alarm',
  'edit_calendar',
  'edit_square',
  'label',
  'extension',
  'record_voice_over',
  'web',
  'rate_review',
  'event_note',
  'hourglass_empty',
  'published_with_changes',
  'support',
  'notification_important',
  'accessibility_new',
  'help_center',
  'bookmarks',
  'pan_tool_alt',
  'dangerous',
  'supervised_user_circle',
  'mail',
  'call',
  'notifications',
  'send',
  'chat',
  'link',
  'forum',
  'inventory_2',
  'chat_bubble',
  'phone_in_talk',
  'contact_support',
  'notifications_active',
  'alternate_email',
  'sms',
  'comment',
  'hub',
  'person_search',
  'import_contacts',
  'contacts',
  'contact_mail',
  'live_help',
  'forward_to_inbox',
  'reviews',
  'lan',
  'mark_email_unread',
  'hourglass_top',
  'mode_comment',
  'contact_phone',
  'inbox',
  'drafts',
  'outgoing_mail',
  'hourglass_bottom',
  'mark_email_read',
  'link_off',
  'calendar_add_on',
  'add_comment',
  'g_translate',
  'phone_enabled',
  'speaker_notes',
  'perm_phone_msg',
  'co_present',
  'notifications_off',
  'call_end',
  'topic',
  'cell_tower',
  'mark_chat_unread',
  'network_intelligence',
  'schedule_send',
  'satellite_alt',
  'dialpad',
  'call_made',
  'mark_unread_chat_alt',
  'unarchive',
  '3p',
  'cancel_presentation',
  'move_to_inbox',
  'mark_as_unread',
  'next_plan',
  'phonelink_ring',
  'attach_email',
  'unsubscribe',
  'phone_callback',
  'present_to_all',
  'call_received',
  'settings_phone',
  'call_split',
  'add_call',
  'markunread_mailbox',
  'all_inbox',
  'voice_chat',
  'phone_forwarded',
  'mail_lock',
  'edit',
  'photo_camera',
  'image',
  'tune',
  'timer',
  'picture_as_pdf',
  'circle',
  'palette',
  'add_a_photo',
  'photo_library',
  'auto_stories',
  'add_photo_alternate',
  'brush',
  'imagesmode',
  'nature',
  'flash_on',
  'wb_sunny',
  'camera',
  'looks_one',
  'straighten',
  'landscape',
  'timelapse',
  'slideshow',
  'crop_square',
  'rotate_right',
  'grid_on',
  'adjust',
  'aspect_ratio',
  'crop_free',
  'style',
  'brightness_6',
  'photo',
  'image_search',
  'nature_people',
  'filter_vintage',
  'crop',
  'blur_on',
  'center_focus_strong',
  'compare',
  'contrast',
  'looks_two',
  'flare',
  'colorize',
  'rotate_left',
  'wb_incandescent',
  'filter_none',
  'wb_twilight',
  'filter_drama',
  'healing',
  'looks_3',
  'brightness_5',
  'animation',
  'invert_colors',
  'incomplete_circle',
  'opacity',
  'broken_image',
  'filter_center_focus',
  'auto_awesome_motion',
  'brightness_4',
  'flip',
  'center_focus_weak',
  'flash_off',
  'flip_camera_android',
  'shopping_cart',
  'payments',
  'shopping_bag',
  'monitoring',
  'credit_card',
  'receipt_long',
  'attach_money',
  'database',
  'trending_up',
  'storefront',
  'sell',
  'account_balance',
  'work',
  'paid',
  'analytics',
  'account_balance_wallet',
  'query_stats',
  'savings',
  'store',
  'calculate',
  'bar_chart',
  'qr_code_scanner',
  'account_tree',
  'add_shopping_cart',
  'redeem',
  'receipt',
  'currency_exchange',
  'trending_flat',
  'shopping_basket',
  'qr_code_2',
  'domain',
  'precision_manufacturing',
  'qr_code',
  'leaderboard',
  'timeline',
  'corporate_fare',
  'insert_chart',
  'wallet',
  'currency_rupee',
  'show_chart',
  'meeting_room',
  'work_history',
  'euro',
  'credit_score',
  'barcode_scanner',
  'loyalty',
  'pie_chart',
  'conversion_path',
  'copyright',
  'barcode',
  'trending_down',
  'track_changes',
  'price_check',
  'schema',
  'euro_symbol',
  'add_business',
  'add_card',
  'card_membership',
  'currency_bitcoin',
  'price_change',
  'donut_large',
  'production_quantity_limits',
  'tenancy',
  'data_exploration',
  'bubble_chart',
  'donut_small',
  'contactless',
  'money',
  'stacked_line_chart',
  'stacked_bar_chart',
  'money_off',
  'toll',
  'cases',
  'currency_yen',
  'area_chart',
  'currency_pound',
  'atr',
  'remove_shopping_cart',
  'room_preferences',
  'add_chart',
  'shop',
  'domain_add',
  'grouped_bar_chart',
  'card_travel',
  'scatter_plot',
  'legend_toggle',
  'mediation',
  'credit_card_off',
  'ssid_chart',
  'candlestick_chart',
  'description',
  'content_copy',
  'dashboard',
  'edit_note',
  'grid_view',
  'list',
  'folder',
  'list_alt',
  'inventory',
  'folder_open',
  'article',
  'fact_check',
  'attach_file',
  'format_list_bulleted',
  'assignment',
  'task',
  'checklist',
  'cloud',
  'cloud_upload',
  'draft',
  'summarize',
  'draw',
  'newspaper',
  'file_copy',
  'view_list',
  'note_add',
  'design_services',
  'book',
  'border_color',
  'history_edu',
  'format_quote',
  'pending_actions',
  'post_add',
  'request_quote',
  'cloud_download',
  'drag_handle',
  'table',
  'contact_page',
  'archive',
  'space_dashboard',
  'content_paste',
  'percent',
  'attachment',
  'assignment_ind',
  'format_list_numbered',
  'assignment_turned_in',
  'tag',
  'table_chart',
  'text_fields',
  'dashboard_customize',
  'integration_instructions',
  'sticky_note_2',
  'format_bold',
  'reorder',
  'find_in_page',
  'text_snippet',
  'document_scanner',
  'docs',
  'checklist_rtl',
  'edit_document',
  'note_alt',
  'cloud_sync',
  'school',
  'campaign',
  'construction',
  'engineering',
  'volunteer_activism',
  'science',
  'sports_esports',
  'confirmation_number',
  'real_estate_agent',
  'cake',
  'self_improvement',
  'sports_soccer',
  'air',
  'biotech',
  'water',
  'hiking',
  'architecture',
  'sports_score',
  'sports_basketball',
  'personal_injury',
  'waves',
  'theaters',
  'sports_tennis',
  'switch_account',
  'experiment',
  'nights_stay',
  'sports_gymnastics',
  'how_to_vote',
  'backpack',
  'sports_motorsports',
  'surfing',
  'sports_kabaddi',
  'piano',
  'sports',
  'trophy',
  'toys',
  'sports_volleyball',
  'sports_baseball',
  'camping',
  'sports_martial_arts',
  'phishing',
  'swords',
  'downhill_skiing',
  'scoreboard',
  'kayaking',
  'sports_football',
  'sports_handball',
  'skateboarding',
  'featured_seasonal_and_gifts',
  'sports_golf',
  'toys_fan',
  'sports_cricket',
  'nordic_walking',
  'roller_skating',
  'memory',
  'apartment',
  'location_city',
  'fitness_center',
  'lunch_dining',
  'spa',
  'cottage',
  'local_cafe',
  'hotel',
  'family_restroom',
  'beach_access',
  'local_bar',
  'pool',
  'other_houses',
  'luggage',
  'liquor',
  'casino',
  'airplane_ticket',
  'room_service',
  'sports_bar',
  'bakery_dining',
  'ramen_dining',
  'nightlife',
  'local_dining',
  'holiday_village',
  'icecream',
  'escalator_warning',
  'dinner_dining',
  'museum',
  'night_shelter',
  'festival',
  'food_bank',
  'attractions',
  'golf_course',
  'stairs',
  'villa',
  'smoke_free',
  'car_rental',
  'smoking_rooms',
  'airline_seat_recline_normal',
  'elevator',
  'gite',
  'child_friendly',
  'airline_seat_recline_extra',
  'breakfast_dining',
  'carpenter',
  'car_repair',
  'cabin',
  'brunch_dining',
  'do_not_touch',
  'no_food',
  'houseboat',
  'tapas',
  'rice_bowl',
  'wheelchair_pickup',
  'bento',
  'no_drinks',
  'do_not_step',
  'airline_seat_flat',
  'bungalow',
  'travel',
  'escalator',
  'airline_seat_individual_suite',
  'chalet'
]

export {
  ProviderTypes,
  models,
  InputTypes,
  modelOptions,
  dialogOptions,
  codeExtensions,
  materialSymbols,
  mdPreviewThemes,
  mdCodeThemes
}
