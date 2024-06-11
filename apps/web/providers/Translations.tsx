import { TFunction } from "i18next";

export class Translations {
   constructor(private readonly t: TFunction<"home", undefined>) {
   }

   // AskAi translations
   public get askAi_description() {
      return this.t(`AskAi.Description`);
   }

   public get askAi_enterPrompt_placeholder() {
      return this.t(`AskAi.EnterPrompt.Placeholder`);
   }

   public get askAi_enterPrompt_warning() {
      return this.t(`AskAi.EnterPrompt.Warning`);
   }

   public get askAi_reportContent_description() {
      return this.t(`AskAi.ReportContent.Description`);
   }

   public get askAi_reportContent_prompt() {
      return this.t(`AskAi.ReportContent.Prompt`);
   }

   public get askAi_reportContent_title() {
      return this.t(`AskAi.ReportContent.Title`);
   }

   public get askAi_title() {
      return this.t(`AskAi.Title`);
   }

   public get askAi_tooltips_archive() {
      return this.t(`AskAi.Tooltips.Archive`);
   }

   public get askAi_tooltips_delete() {
      return this.t(`AskAi.Tooltips.Delete`);
   }

   public get askAi_tooltips_newChat() {
      return this.t(`AskAi.Tooltips.NewChat`);
   }

   public get askAi_tooltips_options() {
      return this.t(`AskAi.Tooltips.Options`);
   }

   public get askAi_tooltips_report() {
      return this.t(`AskAi.Tooltips.Report`);
   }

   // CookieBanner translations
   public get cookieBanner_acceptAll() {
      return this.t(`CookieBanner.AcceptAll`);
   }

   public get cookieBanner_cookieSettings() {
      return this.t(`CookieBanner.CookieSettings`);
   }

   public get cookieBanner_description() {
      return this.t(`CookieBanner.Description`);
   }

   public get cookieBanner_preferences_functionality() {
      return this.t(`CookieBanner.Preferences.Functionality`);
   }

   public get cookieBanner_preferences_learnMore() {
      return this.t(`CookieBanner.Preferences.LearnMore`);
   }

   public get cookieBanner_preferences_marketing() {
      return this.t(`CookieBanner.Preferences.Marketing`);
   }

   public get cookieBanner_preferences_necessary() {
      return this.t(`CookieBanner.Preferences.Necessary`);
   }

   public get cookieBanner_preferences_statistics() {
      return this.t(`CookieBanner.Preferences.Statistics`);
   }

   public get cookieBanner_preferences_title() {
      return this.t(`CookieBanner.Preferences.Title`);
   }

   public get cookieBanner_readCookiePolicy() {
      return this.t(`CookieBanner.ReadCookiePolicy`);
   }

   // Footer translations
   public get footer_legal_cookie() {
      return this.t(`Footer.Legal.Cookie`);
   }

   public get footer_legal_privacy() {
      return this.t(`Footer.Legal.Privacy`);
   }

   public get footer_legal_terms() {
      return this.t(`Footer.Legal.Terms`);
   }

   public get footer_legal_title() {
      return this.t(`Footer.Legal.Title`);
   }

   public get footer_links_features() {
      return this.t(`Footer.Links.Features`);
   }

   public get footer_links_home() {
      return this.t(`Footer.Links.Home`);
   }

   public get footer_links_report() {
      return this.t(`Footer.Links.Report`);
   }

   public get footer_links_support() {
      return this.t(`Footer.Links.Support`);
   }

   public get footer_links_title() {
      return this.t(`Footer.Links.Title`);
   }

   // Header translations
   public get header_askAi() {
      return this.t(`Header.AskAI`);
   }

   public get header_explore() {
      return this.t(`Header.Explore`);
   }

   public get header_myNotes() {
      return this.t(`Header.MyNotes`);
   }

   public get header_signIn() {
      return this.t(`Header.SignIn`);
   }

   public get header_signOut() {
      return this.t(`Header.SignOut`);
   }

   public get header_tooltips_createNote() {
      return this.t(`Header.Tooltips.CreateNote`);
   }

   public get header_tooltips_reportIssue() {
      return this.t(`Header.Tooltips.ReportIssue`);
   }

   public get header_userDropdown_changeProfilePicture() {
      return this.t(`Header.UserDropdown.ChangeProfilePicture`);
   }

   public get header_userDropdown_language() {
      return this.t(`Header.UserDropdown.Language`);
   }

   // Index translations
   public get index_faq() {
      return this.t(`Index.FAQ`);
   }

   public get index_faq1q() {
      return this.t(`Index.FAQ1Q`);
   }

   public get index_faq2q() {
      return this.t(`Index.FAQ2Q`);
   }

   public get index_faq3q() {
      return this.t(`Index.FAQ3Q`);
   }

   public get index_faq4q() {
      return this.t(`Index.FAQ4Q`);
   }

   public get index_faq5q() {
      return this.t(`Index.FAQ5Q`);
   }

   public get index_feature1Description() {
      return this.t(`Index.Feature1Description`);
   }

   public get index_feature1Title() {
      return this.t(`Index.Feature1Title`);
   }

   public get index_feature2Description() {
      return this.t(`Index.Feature2Description`);
   }

   public get index_feature2Title() {
      return this.t(`Index.Feature2Title`);
   }

   public get index_feature3Description() {
      return this.t(`Index.Feature3Description`);
   }

   public get index_feature3Title() {
      return this.t(`Index.Feature3Title`);
   }

   public get index_footer_socials() {
      return this.t(`Index.Footer.Socials`);
   }

   public get index_heroCta() {
      return this.t(`Index.HeroCTA`);
   }

   public get index_heroDescription() {
      return this.t(`Index.HeroDescription`);
   }

   public get index_heroTitle() {
      return this.t(`Index.HeroTitle`);
   }

   // Misc translations
   public get misc_cancel() {
      return this.t(`Misc.Cancel`);
   }

   public get misc_changeProfilePicture_description() {
      return this.t(`Misc.ChangeProfilePicture.Description`);
   }

   public get misc_changeProfilePicture_title() {
      return this.t(`Misc.ChangeProfilePicture.Title`);
   }

   public get misc_goBack() {
      return this.t(`Misc.GoBack`);
   }

   public get misc_goBackHome() {
      return this.t(`Misc.GoBackHome`);
   }

   public get misc_save() {
      return this.t(`Misc.Save`);
   }

   public get misc_scrollToTop() {
      return this.t(`Misc.ScrollToTop`);
   }

   public get misc_submit() {
      return this.t(`Misc.Submit`);
   }

   // Notes translations
   public get notes_allNotes() {
      return this.t(`Notes.AllNotes`);
   }

   public get notes_buttons_askAi() {
      return this.t(`Notes.Buttons.AskAi`);
   }

   public get notes_buttons_export() {
      return this.t(`Notes.Buttons.Export`);
   }

   public get notes_buttons_import() {
      return this.t(`Notes.Buttons.Import`);
   }

   public get notes_buttons_newNote() {
      return this.t(`Notes.Buttons.NewNote`);
   }

   public get notes_filterByTags_placeholder() {
      return this.t(`Notes.FilterByTags.Placeholder`);
   }

   public get notes_filtered() {
      return this.t(`Notes.Filtered`);
   }

   public get notes_search_placeholder() {
      return this.t(`Notes.Search.Placeholder`);
   }

   public get notes_show_all() {
      return this.t(`Notes.Show.All`);
   }

   public get notes_show_byCategory() {
      return this.t(`Notes.Show.ByCategory`);
   }

   public get notes_write_placeholders_tags() {
      return this.t(`Notes.Write.Placeholders.Tags`);
   }

   public get notes_write_placeholders_title() {
      return this.t(`Notes.Write.Placeholders.Title`);
   }

   public get notes_write_tooltips_askAi_description() {
      return this.t(`Notes.Write.Tooltips.AskAi.Description`);
   }

   public get notes_write_tooltips_askAi_title() {
      return this.t(`Notes.Write.Tooltips.AskAi.Title`);
   }

   public get notes_write_tooltips_makePrivate() {
      return this.t(`Notes.Write.Tooltips.MakePrivate`);
   }

   public get notes_write_tooltips_makePublic() {
      return this.t(`Notes.Write.Tooltips.MakePublic`);
   }
}
