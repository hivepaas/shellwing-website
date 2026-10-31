// The app's languages, each with a few of its own words: the host list's
// entries, as shellwing's crates/i18n/locales/*.ftl have them.

export interface Language {
  code: string;
  /** The language's name, in itself. */
  name: string;
  localTerminal: string;
  hosts: string;
  snippets: string;
  environments: string;
  configFiles: string;
  notes: string;
  settings: string;
  saveAndConnect: string;
}

const row = (code: string, name: string, words: string): Language => {
  const [
    localTerminal,
    hosts,
    snippets,
    environments,
    configFiles,
    notes,
    settings,
    saveAndConnect,
  ] = words.split('|');
  return {
    code,
    name,
    localTerminal,
    hosts,
    snippets,
    environments,
    configFiles,
    notes,
    settings,
    saveAndConnect,
  };
};

export const languages: Language[] = [
  row(
    'en',
    'English',
    'Local terminal|Hosts|Snippets|Environments|Config files|Notes|Settings|Save and connect'
  ),
  row(
    'vi',
    'Tiếng Việt',
    'Terminal cục bộ|Máy chủ|Đoạn lệnh|Biến môi trường|Tệp cấu hình|Ghi chú|Cài đặt|Lưu và kết nối'
  ),
  row(
    'zh',
    '简体中文',
    '本地终端|主机|代码片段|环境|配置文件|笔记|设置|保存并连接'
  ),
  row(
    'zh-Hant',
    '繁體中文',
    '本機終端機|主機|程式碼片段|環境|設定檔|筆記|設定|儲存並連線'
  ),
  row(
    'ja',
    '日本語',
    'ローカルターミナル|ホスト|スニペット|環境|設定ファイル|ノート|設定|保存して接続'
  ),
  row(
    'ko',
    '한국어',
    '로컬 터미널|호스트|스니펫|환경|설정 파일|노트|설정|저장 후 연결'
  ),
  row(
    'de',
    'Deutsch',
    'Lokales Terminal|Hosts|Snippets|Umgebungen|Konfigurationsdateien|Notizen|Einstellungen|Speichern und verbinden'
  ),
  row(
    'fr',
    'Français',
    'Terminal local|Serveurs|Extraits|Environnements|Fichiers de configuration|Notes|Réglages|Enregistrer et se connecter'
  ),
  row(
    'es',
    'Español',
    'Terminal local|Servidores|Fragmentos|Entornos|Archivos de configuración|Notas|Ajustes|Guardar y conectar'
  ),
  row(
    'pt',
    'Português (Brasil)',
    'Terminal local|Servidores|Trechos|Ambientes|Arquivos de configuração|Notas|Configurações|Salvar e conectar'
  ),
  row(
    'ru',
    'Русский',
    'Локальный терминал|Хосты|Сниппеты|Окружения|Файлы конфигурации|Заметки|Настройки|Сохранить и подключиться'
  ),
  row(
    'uk',
    'Українська',
    'Локальний термінал|Хости|Сніпети|Середовища|Файли конфігурації|Нотатки|Налаштування|Зберегти та підключитися'
  ),
  row(
    'it',
    'Italiano',
    'Terminale locale|Host|Snippet|Ambienti|File di configurazione|Note|Impostazioni|Salva e connetti'
  ),
  row(
    'id',
    'Bahasa Indonesia',
    'Terminal lokal|Host|Snippet|Lingkungan|Berkas konfigurasi|Catatan|Pengaturan|Simpan dan hubungkan'
  ),
  row(
    'tr',
    'Türkçe',
    'Yerel terminal|Ana makineler|Kod parçacıkları|Ortamlar|Yapılandırma dosyaları|Notlar|Ayarlar|Kaydet ve bağlan'
  ),
];
